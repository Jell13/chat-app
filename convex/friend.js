import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const remove = mutation({
    args:{
        id: v.id("conversations")
    },
    handler: async (ctx, args) => {

        const identity = await ctx.auth.getUserIdentity()
        if(!identity){
            throw new ConvexError("Unauthorized")
        }

        const currentUser = await ctx.db.query("users").withIndex("by_tokenIdentifier", q => q.eq("tokenIdentifier", identity.tokenIdentifier)).unique()
        if(!currentUser){
            throw new ConvexError("User not found")
        }

        const conversation = await ctx.db.get(args.id)
        if(!conversation){
            throw new ConvexError("Conversation not found")
        }

        const memberships = await ctx.db.query("conversationMembers").withIndex("by_conversationId", q => q.eq("conversationId", args.id)).collect()
        if(!memberships || memberships.length !== 2){
            throw new ConvexError("This conversation does not have any members")
        }

        const friendships = await ctx.db.query("friends").withIndex("by_conversationId", q => {
            return q.eq("conversationId", args.id)
        }).unique()

        if(!friendships){
            throw new ConvexError("Friend could not be found")
        }

        const messages = await ctx.db.query("messages").withIndex("by_conversationId", q => q.eq("conversationId", args.id)).collect()

        await ctx.db.delete(args.id)
        await ctx.db.delete(friendships._id)

        await Promise.all(memberships.map(async membership => {
            await ctx.db.delete(membership._id)
        }))

        await Promise.all(messages.map(async message => {
            await ctx.db.delete(message._id)
        }))
    }
})