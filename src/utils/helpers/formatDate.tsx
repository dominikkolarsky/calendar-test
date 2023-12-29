export function formatDateToUTC_YYYYMMDD(date: string | Date): string {
  const newDate = new Date(date);

  const year = newDate.getUTCFullYear().toString();
  const month = newDate.getUTCMonth() + 1;
  const day = newDate.getUTCDate();
  return `${year}${month < 10 ? '0' + month : month}${day < 10 ? '0' + day : day}`;
}
