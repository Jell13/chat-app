import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
    args:{
        conversationId: v.id("conversations"),
        type: v.string(),
        convent: v.array(v.string())
    },
    handler: async (ctx, args) => {

        const identity = await ctx.auth.getUserIdentity()
        if(!identity){
            throw new ConvexError("Unauthorized")
        }

        const currentUser = await ctx.db.query("users").withIndex("by_tokenIdentifier", q => q.eq("tokenIdentifier", identity.tokenIdentifier))
        if(!currentUser){
            throw new ConvexError("User not found")
        }

        const membership = await ctx.db.query("conversationMembers").withIndex("by_memberId_conversationId", q => q.eq("memberId", currentUser._id).eq("conversationId", args.conversationId)).unique()
        if(!membership){
            throw new ConvexError("You aren't a member of this conversation")
        }

        const message = await ctx.db.insert("messages", {
            senderId: currentUser._id,
            ...args
        })

        await ctx.db.patch(args.conversationId, {lastMessageId: message})
        
        return message
    }
})