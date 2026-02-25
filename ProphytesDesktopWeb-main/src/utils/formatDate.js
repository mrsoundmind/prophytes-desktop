export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const isYesterday = date.toDateString() === yesterday.toDateString();

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());

  const isThisWeek = date >= startOfWeek && date < now;

  if (isToday) {
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  } else if (isYesterday) {
    return "Yesterday";
  } else if (isThisWeek) {
    return date.toLocaleDateString([], {
      weekday: "long",
    });
  } else {
    return date.toLocaleDateString([], {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  }
};
