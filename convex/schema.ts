import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        username: v.string(),
        email: v.string(),
        tokenIdentifier: v.string(),
        imageUrl: v.string()
    }).index("by_email", ["email"]).index("by_tokenIdentifier", ["tokenIdentifier"])
})