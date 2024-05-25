export const getUserByToken = async ({ctx, token}) => {
    console.log("Enter _utils.js")
    return await ctx.db.query("users").withIndex("tokenIdentifier", q => q.eq('tokenIdentifier', token)).unique()
}