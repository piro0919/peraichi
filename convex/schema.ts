import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  memos: defineTable({
    content: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    userId: v.string(),
  }).index("by_user", ["userId"]),
});
