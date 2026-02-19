// utils/date.ts
export function formatDate(date: Date): string {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months   = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const dayName  = weekdays[date.getDay()];
  const day      = String(date.getDate()).padStart(2, '0');
  const month    = months[date.getMonth()];
  const year     = date.getFullYear();

  return `${dayName} ${day} ${month} ${year}`;
}