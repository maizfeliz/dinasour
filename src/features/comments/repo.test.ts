import { describe, it, beforeEach, expect } from "vitest"
import type { RawComment } from "../../types/comment"
import { db } from "../../lib/db"
import { loadAll, addComment, deleteCascade } from "./repo"

describe("repo (Dexie)", () => {
  beforeEach(async () => {
    await db.open()
    await db.comments.clear()
  })

  it("addComment + loadAll sorts by createdAt", async () => {
    const rows: RawComment[] = [
      { id: "1", parentId: null, authorId: "u1", text: "old1", createdAt: 1 },
      { id: "2", parentId: null, authorId: "u2", text: "old2", createdAt: 2 },
    ]
    await db.comments.bulkAdd(rows)

    await addComment("new", null, "u3")

    const all = await loadAll()
    expect(all.map((r) => r.text)).toEqual(["old1", "old2", "new"])
  })

  it("deleteCascade removes parent and all descendants", async () => {
    const base: RawComment[] = [
      { id: "1", parentId: null, authorId: "u1", text: "old1", createdAt: 1 },
      { id: "2", parentId: "1", authorId: "u1", text: "old2", createdAt: 2 },
      { id: "3", parentId: "2", authorId: "u1", text: "old1", createdAt: 3 },
      { id: "4", parentId: null, authorId: "u1", text: "old2", createdAt: 4 },
    ]
    await db.comments.bulkAdd(base)

    await deleteCascade("1")

    const left = await db.comments.orderBy("createdAt").toArray()
    expect(left.map((comment) => comment.id)).toEqual(["4"])
  })
})
