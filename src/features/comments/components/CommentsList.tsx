import { useMemo } from "react";
import CommentItem from "./CommentItem";
import type { RawComment } from "../../../types/comment";

type CommentsListProps = {
  comments: RawComment[];
  currentUser: string;
  onReply: (id: string, authorId: string) => void;
  onDelete: (id: string) => void;
};

type ChildrenByParent = Map<string | null, RawComment[]>;

function groupByParent(comments: RawComment[]): ChildrenByParent {
  const childrenByParent = new Map<string | null, RawComment[]>();

  for (const comment of comments) {
    const parentKey = comment.parentId;
    const siblings = childrenByParent.get(parentKey);

    if (siblings) {
      siblings.push(comment);
    } else {
      childrenByParent.set(parentKey, [comment]);
    }
  }

  for (const siblingList of childrenByParent.values()) {
    siblingList.sort((a, b) => a.createdAt - b.createdAt);
  }

  return childrenByParent;
}

export default function CommentsList({
  comments,
  currentUser,
  onReply,
  onDelete,
}: CommentsListProps) {
  const byParent = useMemo(() => groupByParent(comments), [comments]);
  const roots = byParent.get(null) ?? [];

  function CommentNode({
    comment,
    depth,
  }: {
    comment: RawComment;
    depth: number;
  }) {
    const children = byParent.get(comment.id) ?? [];

    return (
      <CommentItem
        id={comment.id}
        authorId={comment.authorId ?? "User"}
        currentUser={currentUser}
        text={comment.text}
        createdAt={comment.createdAt}
        depth={depth}
        onReply={(id, authorId) => onReply(id, authorId)}
        onDelete={(id) => onDelete?.(id)}
      >
        {children.map((child) => (
          <CommentNode key={child.id} comment={child} depth={depth + 1} />
        ))}
      </CommentItem>
    );
  }

  return (
    <ul
      className="
        w-full min-h-screen mx-auto bg-white
        max-w-screen-sm md:max-w-2xl lg:max-w-3xl xl:max-w-4xl
        p-4 sm:p-6 lg:p-8
        shadow divide-y
      "
    >
      {!comments.length ? (
        <li className="py-10 text-center text-gray-500">
          Be the first to comment! 😃
        </li>
      ) : (
        roots.map((comment) => (
          <CommentNode key={comment.id} comment={comment} depth={0} />
        ))
      )}
    </ul>
  );
}
