// Accepts local (09…), country-code (98…) and already-plus (+98…) forms
export function toInternationalPhone(raw) {
  const digits = String(raw ?? '').replace(/\D/g, '')
  if (!digits) return ''
  if (digits.startsWith('0098')) return `+98${digits.slice(4)}`
  if (digits.startsWith('98')) return `+98${digits.slice(2)}`
  if (digits.startsWith('0')) return `+98${digits.slice(1)}`
  return `+98${digits}`
}
