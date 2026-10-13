const BASE_URL = import.meta.env.VITE_API_URL

/**
 * Fetch a single inspection report.
 *
 * @param {string|number} id
 * @returns {Promise<InspectionReport>}
 * @throws {Error} on network failure or non-2xx response
 */
export async function getReport(id) {
  const response = await fetch(`${BASE_URL}/api/inspections/${id}`)
  if (!response.ok) {
    const error = new Error(`Failed to load report ${id}: ${response.status} ${response.statusText}`)
    error.status = response.status
    throw error
  }
  return response.json()
}

/**
 * Inspection report returned by GET /api/inspections/{id}.
 * Boolean part fields: true = repainted/repaired («دارد»), false = healthy («ندارد»).
 *
 * @typedef {Object} InspectionReport
 * @property {number|string} id
 * @property {string} inspectionDate            — "yyyy-MM-dd'T'HH:mm", local time
 * @property {string} expertName
 * @property {string} expertPhoneNumber
 * @property {string} fullName
 * @property {string} phoneNumber
 * @property {string} carName
 * @property {string} carModel
 * @property {string} chassisNumber
 * @property {string} plateNumber
 * @property {string} expertDescription
 * @property {boolean} roof
 * @property {boolean} chassis
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
