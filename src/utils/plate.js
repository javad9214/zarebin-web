const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹'
const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩'
const ASCII_DIGITS = '0123456789'

function translate(text, from, to) {
  return [...text].map((ch) => (from.includes(ch) ? to[from.indexOf(ch)] : ch)).join('')
}

/**
 * Fallback parser for plate strings served by a pre-plate-object backend
 * during redeploy; the API normally sends the structured plate object
 * directly. Accepts the historical formats ("12 345 ب 67", the " ایران "
 * affix, Persian/Arabic digits).
 *
 * @param {string} value
 * @returns {{firstTwo: string, threeDigits: string, letter: string, iranCode: string}|null}
 *   null when the value doesn't match any known layout, so callers can fall
 *   back to showing the raw string.
 */
export function parsePlate(value) {
  if (typeof value !== 'string' || !value.trim()) return null

  const normalized = translate(
    translate(value, PERSIAN_DIGITS, ASCII_DIGITS),
    ARABIC_DIGITS,
    ASCII_DIGITS,
  ).replaceAll('ایران', ' ')

  let letter = null
  const numbers = []
  for (const token of normalized.split(/[\s-]+/)) {
    if (!token) continue
    if (/^\d+$/.test(token)) numbers.push(token)
    else if (token.length === 1 && letter === null) letter = token
    else return null
  }

  if (letter === null || numbers.length !== 3) return null
  if (numbers[0].length !== 2 || numbers[1].length !== 3 || numbers[2].length !== 2) return null

  return { firstTwo: numbers[0], threeDigits: numbers[1], letter, iranCode: numbers[2] }
}
