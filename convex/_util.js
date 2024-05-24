export const getUserByToken = async ({ctx, token}) => {
    return await ctx.db.query("users").withIndex("tokenIdentifier", q => q.eq('tokenIdentifier', token)).unique()
}