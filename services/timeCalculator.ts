// calculing time how long ago the job was created
export function timeCalculator(date: string) {
  const today = new Date();
  const timeDiff = Math.abs(today.getTime() - new Date(date).getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (diffDays === 0) {
    const diffHours = Math.ceil(timeDiff / (1000 * 3600));
    if (diffHours === 0) {
      const diffMinutes = Math.ceil(timeDiff / (1000 * 60));
      if (diffMinutes === 0) {
        const diffSeconds = Math.ceil(timeDiff / 1000);
        return `${diffSeconds} seconds ago`;
      } else {
        return `${diffMinutes} minutes ago`;
      }
    } else {
      return `${diffHours} hours ago`;
    }
  } else if (diffDays === 1) {
    return "Yesterday";
  } else {
    return `${diffDays} days ago`;
  }
}
