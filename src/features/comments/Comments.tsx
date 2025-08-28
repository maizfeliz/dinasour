import { useEffect, useState } from "react";
import CommentsList from "./components/CommentsList";
import CommentInputBar from "./components/CommentInputBar";
import { loadAll, addComment, deleteCascade } from "./repo";
import type { RawComment } from "../../types/comment";

type CommentProps = {
  currentUser: string;
};
export type ReplyTarget = { id: string; authorId?: string };

function Comments({ currentUser }: CommentProps) {
  const [comments, setComments] = useState<RawComment[]>([]);
  const [replyTo, setReplyTo] = useState<ReplyTarget | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setComments(await loadAll());
      } catch (e) {
        console.error(e);
        alert("Failed to load comments!");
      }
    })();
  }, []);

  async function handleSubmit(text: string) {
    await addComment(text, replyTo?.id ?? null, currentUser);
    setReplyTo(null);
    setComments(await loadAll());
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this comment? This will delete its replies as well."))
      return;
    await deleteCascade(id);
    setComments(await loadAll());
  }

  return (
    <div className="min-h-screen pb-24 bg-gray-50">
      <CommentsList
        comments={comments}
        currentUser={currentUser}
        onReply={(id: string, authorId: string) => setReplyTo({ id, authorId })}
        onDelete={handleDelete}
      />
      <CommentInputBar
        replyingTo={replyTo}
        onCancelReply={() => setReplyTo(null)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default Comments;
