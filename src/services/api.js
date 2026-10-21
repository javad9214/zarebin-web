const BASE_URL = import.meta.env.VITE_API_URL

/**
 * Fetch a single inspection report through its unguessable share key.
 *
 * @param {string} publicId — UUID share key from the link/code the expert sent
 * @returns {Promise<InspectionReport>}
 * @throws {Error} on network failure or non-2xx response (404 = unknown key,
 *   400 = malformed key)
 */
export async function getReport(publicId) {
  const response = await fetch(`${BASE_URL}/api/inspections/public/${publicId}`)
  if (!response.ok) {
    const error = new Error(`Failed to load report ${publicId}: ${response.status} ${response.statusText}`)
    error.status = response.status
    throw error
  }
  return response.json()
}

/**
 * Inspection report returned by GET /api/inspections/public/{publicId}.
 * Boolean part fields: true = repainted/repaired («دارد»), false = healthy («ندارد»).
 *
 * @typedef {Object} InspectionReport
 * @property {number|string} id                    — internal id (expert app use)
 * @property {string} publicId                     — UUID share key used by the web
 * @property {string} inspectionDate               — "yyyy-MM-dd'T'HH:mm", local time
 * @property {string} expertName
 * @property {string} expertPhoneNumber
 * @property {string} fullName
 * @property {string} phoneNumber
 * @property {string} carName
 * @property {string} carModel
 * @property {string} chassisNumber
 * @property {{firstTwo: string, letter: string, threeDigits: string, iranCode: string}} plateNumber — structured plate parts rendered by the plate component
 * @property {string} expertDescription
 * @property {boolean} roof
 * @property {boolean|null} frontChassis   — null on rows predating the chassis split
 * @property {boolean|null} rearChassis    — null on rows predating the chassis split
 * @property {boolean|null} pillars        — null on rows predating the pillars flag
 * @property {boolean} frontLeftFender
 * @property {boolean} frontRightFender
 * @property {boolean} rearLeftFender
 * @property {boolean} rearRightFender
 * @property {boolean} hood
 * @property {boolean} trunk
 * @property {boolean} frontLeftDoor
 * @property {boolean} frontRightDoor
 * @property {boolean} rearLeftDoor
 * @property {boolean} rearRightDoor
 */
