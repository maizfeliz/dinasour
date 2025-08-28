import { useState } from "react";
import { formatCommentTime, isWithinOneDay } from "../../../utils/date";

type CommentItemProps = {
  id: string;
  authorId: string;
  currentUser?: string;
  text: string;
  createdAt: number;
  depth?: number;
  onReply?: (id: string, authorId: string) => void;
  onDelete?: (id: string) => void;
  children?: React.ReactNode;
};

export default function CommentItem({
  id,
  authorId,
  currentUser,
  text,
  createdAt,
  depth = 0,
  onReply,
  onDelete,
  children,
}: CommentItemProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthor = currentUser && authorId === currentUser;

  const isNew = isWithinOneDay(createdAt);

  return (
    <li
      className={`relative py-3 transition-colors ${
        depth > 0 && "border-l border-gray-200 pl-2"
      }`}
      style={{ paddingLeft: depth * 16 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`font-semibold  ${
                  isAuthor ? "text-green-700" : "text-gray-900"
                }`}
              >
                {authorId}
              </span>
              <span className="text-sm text-gray-500">
                {formatCommentTime(createdAt)}
              </span>
              {isNew && (
                <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-red-600 text-white">
                  N
                </span>
              )}
            </div>

            <p className="mt-2 text-gray-900 whitespace-pre-wrap">{text}</p>
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="px-2 py-1 text-gray-500 bg-gray-100"
          >
            ⋯
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 mt-1 w-28 rounded-md border bg-white shadow z-10"
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button
                className="block w-full text-left px-3 py-2 hover:bg-gray-50"
                onClick={() => {
                  setMenuOpen(false);
                  onReply?.(id, authorId);
                }}
              >
                Reply
              </button>
              {isAuthor && (
                <button
                  className="block w-full text-left px-3 py-2 text-red-600 hover:bg-gray-50"
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete?.(id);
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {children && (
        <ul className="mt-2 space-y-2" role="list">
          {children}
        </ul>
      )}
    </li>
  );
}
