import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import CommentsList from "./CommentsList"
import type { RawComment } from "../../../types/comment"

describe("CommentsList render", () => {
  it("renders comments", () => {
    const rows: RawComment[] = [
      { id: "1", parentId: null, authorId: "u1", text: "old", createdAt: 1 },
      { id: "2", parentId: "1", authorId: "u2", text: "new", createdAt: 2 },
    ]

    render(<CommentsList comments={rows} currentUser="u1" onReply={() => {}} onDelete={() => {}} />)

    expect(screen.getByText("old")).toBeInTheDocument()
    expect(screen.getByText("new")).toBeInTheDocument()
  })
})
