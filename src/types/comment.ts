export type RawComment = {
  id: string;
  parentId: string | null;
  authorId: string;
  text: string;
  createdAt: number;
};
