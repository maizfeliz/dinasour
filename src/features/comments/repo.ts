import { db } from "../../lib/db";
import type { RawComment } from "../../types/comment";

export async function loadAll(): Promise<RawComment[]> {
  return db.comments.orderBy("createdAt").toArray();
}

export async function addComment(
  text: string,
  parentId: string | null,
  authorId: string
): Promise<void> {
  const trimmed = text.trim();
  if (!trimmed) return;

  const rec: RawComment = {
    id: crypto.randomUUID(),
    parentId,
    authorId,
    text: trimmed,
    createdAt: Date.now(),
  };

  await db.comments.add(rec);
}

export async function deleteCascade(rootCommentId: string): Promise<void> {
  const allComments: RawComment[] = await db.comments.toArray();

  const childrenByParent = new Map<string, string[]>();
  for (const comment of allComments) {
    const parentId = comment.parentId;
    if (!parentId) continue;

    const childIds = childrenByParent.get(parentId) ?? [];
    childIds.push(comment.id);
    childrenByParent.set(parentId, childIds);
  }

  const stack: string[] = [rootCommentId];
  const idsToDelete: string[] = [];

  while (stack.length) {
    const currentId = stack.pop()!;
    idsToDelete.push(currentId);

    const directChildren = childrenByParent.get(currentId) ?? [];
    for (const childId of directChildren) stack.push(childId);
  }

  await db.comments.bulkDelete(idsToDelete);
}
