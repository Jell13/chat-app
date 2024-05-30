import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
    args:{
        id: v.id("conversations")
    },
    handler: async (ctx, args) => {

        const identity = await ctx.auth.getUserIdentity()
        if(!identity){
            throw new ConvexError("Unauthorized")
        }

        const currentUser = await ctx.db.query("users").withIndex("by_tokenIdentifier", q => q.eq("tokenIdentifier", identity.tokenIdentifier)).unique()
        console.log(currentUser)
        if(!currentUser){
            throw new ConvexError("User not found")
        }

        const conversation = await ctx.db.get(args.id)
        console.log(conversation)
        if(!conversation){
            throw new ConvexError("Conversation not found")
        }

        const membership = await ctx.db.query("conversationMembers").withIndex("by_memberId_conversationId", q => q.eq("memberId", currentUser._id).eq("conversationId", conversation._id)).unique()
        console.log(membership)
        if(!membership){
            throw new ConvexError("You aren't a member of this conversation")
        }

        const allConversationMemberships = await ctx.db.query("conversationMembers").withIndex("by_conversationId", q => q.eq("conversationId", args.id)).collect()
        console.log(allConversationMemberships)
        if(!conversation.isGroup){
            const otherMembership = allConversationMemberships.filter(membership => membership.memberId !== currentUser._id)[0]
            console.log(otherMembership)

            const otherMemberDetails = await ctx.db.get(otherMembership.memberId)

            return{
                ...conversation,
                otherMember: {
                    ...otherMemberDetails,
                    lastSeenMessageId:
                    otherMembership.lastSeenMessage
                },
                otherMembers: null
            }
        }
    }
})