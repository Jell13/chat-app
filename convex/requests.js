import { ConvexError } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
    args: {},
    handler: async (ctx) => {

        const identity = await ctx.auth.getUserIdentity()
        if(!identity) {
            throw new ConvexError("Error user not authenticated")
        }

        const currentUser = await ctx.db.query("users").withIndex("by_tokenIdentifier", q => q.eq("tokenIdentifier", identity.tokenIdentifier)).unique()
        console.log(currentUser)
        if(!currentUser){
            throw new ConvexError("Unauthorized user")
        }

        const requests = await ctx.db.query("requests").withIndex("by_receiver", q => q.eq("receiver", currentUser._id)).collect()

        const requestWithSender = await Promise.all(requests.map(async (request) => {
            const sender = await ctx.db.get(request.sender)

            if(!sender){
                throw new ConvexError("Request sender could not be found")
            }

            return {sender, request}
        }))

        return requestWithSender

    }
})