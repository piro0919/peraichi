import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const saveMemo = mutation({
  args: {
    content: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, { content, userId }): Promise<void> => {
    const now = Date.now();
    // Check if user already has a memo
    const existingMemo = await ctx.db
      .query("memos")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (existingMemo) {
      // Update existing memo
      await ctx.db.patch(existingMemo._id, {
        content,
        updatedAt: now,
      });
    } else {
      // Create new memo
      await ctx.db.insert("memos", {
        content,
        createdAt: now,
        updatedAt: now,
        userId,
      });
    }
  },
});

export const getMemo = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("memos")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();
  },
});
