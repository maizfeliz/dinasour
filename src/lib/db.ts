import Dexie, { type Table } from "dexie";
import type { RawComment } from "../types/comment";

class CommentsDB extends Dexie {
  comments!: Table<RawComment, string>;

  constructor() {
    super("awesome_comments_db");
    this.version(1).stores({
      comments: "id, createdAt",
    });
  }
}

export const db = new CommentsDB();
