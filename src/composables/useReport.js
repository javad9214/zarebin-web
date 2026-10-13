import { ref, unref, watch } from 'vue'

import { getReport } from '@/services/api'

/**
 * Load an inspection report reactively.
 *
 * @param {import('vue').Ref<string|number>|string|number} id — plain value or ref/getter;
 *   changing it re-fetches.
 * @returns {{ report: import('vue').Ref<import('@/services/api').InspectionReport|null>,
 *            loading: import('vue').Ref<boolean>,
 *            error: import('vue').Ref<Error|null>,
 *            reload: () => Promise<void> }}
 */
export function useReport(id) {
  const report = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function load(reportId) {
    loading.value = true
    error.value = null
    try {
      report.value = await getReport(reportId)
    } catch (err) {
      report.value = null
      error.value = err
    } finally {
      loading.value = false
    }
  }

  function hasId(value) {
    return value !== undefined && value !== null && value !== ''
  }

  watch(
    () => unref(id),
    (newId) => {
      if (hasId(newId)) load(newId)
    },
    { immediate: true },
  )

  async function reload() {
    const currentId = unref(id)
    if (hasId(currentId)) await load(currentId)
  }

  return { report, loading, error, reload }
}
