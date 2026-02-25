export default function notificationTimeStamp(timestamp) {
  const now = new Date();
  const notificationDate = new Date(timestamp);
  const diffInMs = now.getTime() - notificationDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInDays <= 7) {
    // Within 7 days: show "28 Jul at 8:30pm"
    return (
      notificationDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      }) +
      " at " +
      notificationDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    );
  } else if (diffInWeeks < 4) {
    // Next days/weeks: show "X weeks ago"
    return diffInWeeks === 1 ? "1 week ago" : `${diffInWeeks} weeks ago`;
  } else {
    // Months: show "X months ago"
    return diffInMonths === 1 ? "1 month ago" : `${diffInMonths} months ago`;
  }
}
