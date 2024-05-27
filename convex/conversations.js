import { ConvexError } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
    args:{},
    handler: async (ctx, args) => {
        
        const identity = await ctx.auth.getUserIdentity()
        if(!identity){
            throw new ConvexError("Unauthorized")
        }

        const currentUser = await ctx.db.query("users").withIndex("by_tokenIdentifier", q => q.eq("tokenIdentifier", identity.tokenIdentifier)).unique()
        if(!currentUser){
            throw new ConvexError("User not found")
        }

        const conversationMemberships = await ctx.db.query("conversationMembers").withIndex("by_memberId", q => q.eq("memberId", currentUser._id)).collect()

        const conversations = await Promise.all(conversationMemberships?.map( async membership => {
            const conversation = await ctx.db.get(membership.conversationId)
            if(!conversation){
                throw new ConvexError("Conversation could not be found")
            }

            return conversation
        }))

        const conversationsWithDetails = await Promise.all((await conversations).map(async (conversation, index) => {
            const allconversationMemberships = await ctx.db.query("conversationMembers").withIndex("by_conversationId", q => q.eq("conversationId", conversation?._id)).collect()
            if(conversation.isGroup){
                return {conversation}
            }
            else{
                const otherMembership = allconversationMemberships.filter(membership => membership.memberId !== currentUser._id)[0]
                const otherMember = await ctx.db.get(otherMembership.memberId)

                return {conversation, otherMember}
            }
        }))

        return conversationsWithDetails
    }
})