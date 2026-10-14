<script setup>
import { computed } from 'vue'

import IranianPlate from '@/components/IranianPlate.vue'
import { parsePlate } from '@/utils/plate'

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
})

// Structured plate from the API (preferred); the string branch is a fallback
// for responses served by a pre-plate-object backend during redeploy.
const plate = computed(() => {
  const value = props.report?.plateNumber
  if (value && typeof value === 'object') {
    return {
      firstTwo: String(value.firstTwo ?? ''),
      threeDigits: String(value.threeDigits ?? ''),
      letter: String(value.letter ?? ''),
      iranCode: String(value.iranCode ?? ''),
    }
  }
  return parsePlate(value)
})
</script>

<template>
  <section class="card">
    <h2 class="card__title">مشخصات خودرو</h2>
    <dl class="data-list">
      <div class="data-list__row">
        <dt>خودرو</dt>
        <dd>{{ report.carName }} {{ report.carModel }}</dd>
      </div>
      <div class="data-list__row">
        <dt>شماره شاسی</dt>
        <dd dir="ltr">{{ report.chassisNumber }}</dd>
      </div>
      <div class="data-list__row">
        <dt>شماره پلاک</dt>
        <dd dir="ltr">
          <IranianPlate v-if="plate" :plate="plate" />
          <template v-else>{{ report.plateNumber }}</template>
        </dd>
      </div>
    </dl>
  </section>
</template>
