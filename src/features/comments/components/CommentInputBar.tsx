import { useState } from "react";
import type { ReplyTarget } from "../Comments";

type Props = {
  replyingTo?: ReplyTarget | null;
  onCancelReply?: () => void;
  onSubmit?: (text: string) => void | Promise<void>;
};

export default function CommentInputBar({
  replyingTo = null,
  onCancelReply,
  onSubmit,
}: Props) {
  const [text, setText] = useState("");
  const canPost = text.trim().length > 0;

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!canPost) return;
    await onSubmit?.(text.trim());
    setText("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed inset-x-0 bottom-0 z-50 pb-4 bg-white border-t"
    >
      <div
        className="
      mx-auto w-full max-w-screen-sm
      md:max-w-2xl lg:max-w-3xl xl:max-w-4xl
      "
      >
        <div className="px-4 py-3 grid grid-cols-[40px,1fr,40px] items-center">
          <div className="text-center text-sm text-gray-500 font-medium">
            {replyingTo ? `@${replyingTo.authorId}` : "Write a Comment"}
          </div>

          {replyingTo && (
            <button
              type="button"
              onClick={onCancelReply}
              className="text-gray-500"
              aria-label="Cancel reply"
            >
              ×
            </button>
          )}
        </div>

        <div className="px-4 pb-4 flex items-center gap-2 flex-nowrap">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your comments..."
            className="flex-1 min-w-0 border rounded-full px-4 py-2 bg-white focus:outline-none focus:ring-2"
            aria-label="Comment"
          />
          <button
            type="submit"
            disabled={!canPost}
            className="
            shrink-0 min-w-[72px] px-4 py-2 text-sm font-medium rounded-full
            text-white
            bg-slate-900
            disabled:bg-slate-300 disabled:text-white disabled:cursor-not-allowed
          "
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
