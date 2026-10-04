/**
 * Countdown formatting, ported line for line from the iOS app's
 * Deadline/Shared/DurationText.swift.
 *
 * The mockups previously invented formats the app never produces, like
 * "1d 04h 17m" and "12m 54s". The real rule is one unit, or two adjacent
 * units, and never zero padded:
 *
 *   "2d 4h", "3h 20m", "12m", "45s"
 */

/** DurationText.compact */
export function compact(seconds) {
  const total = Math.max(0, Math.floor(seconds));
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;

  if (days > 0) return hours > 0 ? `${days}d ${hours}h` : `${days}d`;
  if (hours > 0) return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  if (minutes > 0) return `${minutes}m`;
  return `${secs}s`;
}

/** DurationText.relativeToDue */
export function relativeToDue(secondsRemaining) {
  return secondsRemaining <= 0
    ? `Overdue by ${compact(-secondsRemaining)}`
    : `Due in ${compact(secondsRemaining)}`;
}
