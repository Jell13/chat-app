import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { getUserByToken } from "./_util";

export const create = mutation({
    args: {
        email: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if(!identity){
            throw new ConvexError("Unauthorized")
        }

        if(args.email === identity.email){
            throw new ConvexError("Cannot send request to self")
        }

        const currentUser = await getUserByToken(ctx, identity.tokenIdentifier)

        if(!currentUser){
            throw new ConvexError("User not found")
        }

        const receiver = await ctx.db.query("users").withIndex("by_email", q => q.eq("email", args.email)).unique()
        if(!receiver){
            throw new ConvexError("User could not be found")
        }

        const requestAlreadySent = await ctx.db.query("requests").withIndex("by_receiver_sender", q => q.eq("receiver", receiver._id).eq("sender", currentUser._id)).unique()
        if (requestAlreadySent){
            throw new ConvexError("Request is already sent and pending")
        }

        const requestAlreadyReceived = await ctx.db.query("requests").withIndex("by_receiver_sender", q => q.eq("receiver", currentUser._id).eq("sender", receiver._id)).unique()
        if(requestAlreadyReceived){
            throw new ConvexError("This user already send you a request")
        }

        const request = await ctx.db.insert({
            sender: currentUser._id,
            receiver: receiver._id
        })

        return request
    }
})