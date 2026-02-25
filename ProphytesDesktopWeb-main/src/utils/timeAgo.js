export const timeAgo = (isoString, justNowThresholdSec = 20) => {
  if (!isoString) return;
  const now = Date.now();
  const target = new Date(isoString).getTime();

  // Raw diff in seconds (can be negative if target is in the future)
  let diffSec = Math.floor((now - target) / 1000);

  // If within ±threshold, show "just now"
  if (Math.abs(diffSec) <= justNowThresholdSec) {
    return "just now";
  }

  // Past only from here on: clamp negatives to zero so it never shows negative
  if (diffSec < 0) diffSec = 0;

  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffDay > 0) return `${diffDay}d`;
  if (diffHr > 0) return `${diffHr}h`;
  if (diffMin > 0) return `${diffMin}m`;
  return `${diffSec}s`;
};
