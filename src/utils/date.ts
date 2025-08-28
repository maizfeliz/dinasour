import dayjs from "dayjs";

const toDayjs = (ts: number | Date) =>
  typeof ts === "number" ? dayjs(ts < 1e12 ? ts * 1000 : ts) : dayjs(ts);

export function isWithinOneDay(ts: number | Date) {
  const d = toDayjs(ts);
  return dayjs().diff(d, "day") <= 1;
}

export function formatCommentTime(ts: number | Date) {
  const d = toDayjs(ts);
  return d.isSame(dayjs(), "day") ? d.format("HH:mm") : d.format("YYYY.MM.DD");
}
