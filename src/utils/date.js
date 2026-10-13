const persianDateTime = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
  dateStyle: 'long',
  timeStyle: 'short',
})

/**
 * Format an inspectionDate value ("yyyy-MM-dd'T'HH:mm", local time)
 * as a Persian date with time, e.g. «۱۴ مهر ۱۴۰۵،‏ ۱۴:۳۰».
 *
 * @param {string|null|undefined} value
 * @returns {string} formatted date, or '—' when the value is missing/invalid
 */
export function formatPersianDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return persianDateTime.format(date)
}
