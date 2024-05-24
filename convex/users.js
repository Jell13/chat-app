import { ConvexError } from "convex/values";
import { mutation } from "./_generated/server";

export const store = mutation({
    args:{},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity()
        console.log(identity)

        if(!identity){
            throw new ConvexError("Called storeUser before authenticated")
        }

        const user = await ctx.db.query("users").withIndex("by_tokenIdentifier",q => q.eq("tokenIdentifier", identity.tokenIdentifier)).unique()

        if(user !== null){
            return user._id
        }

        const newUser = await ctx.db.insert("users", {
            username: identity.name,
            email: identity.email,
            tokenIdentifier: identity.tokenIdentifier,
            imageUrl: identity.pictureUrl
        })

        return newUser
    }
})