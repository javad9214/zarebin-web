<script setup>
import { computed } from 'vue'
import svgRaw from '@/assets/car-diagram.svg?raw'

const props = defineProps({
  report: { type: Object, required: true },
})

const keys = [
  'frontBumper', 'hood', 'roof', 'trunk', 'rearBumper',
  'frontLeftFender', 'frontRightFender',
  'frontLeftDoor', 'frontRightDoor',
  'rearLeftDoor', 'rearRightDoor',
  'rearLeftFender', 'rearRightFender',
]

const svg = computed(() =>
  keys.reduce(
    (s, k) =>
      props.report[k]
        ? s.replace(`id="${k}" data-part="${k}" class="part"`, `id="${k}" class="part part--damaged"`)
        : s,
    svgRaw,
  ),
)
</script>

<template>
  <figure class="car-diagram" role="img" aria-label="دیاگرام بدنه خودرو؛ قطعات رنگ‌شده یا تعمیرشده با رنگ نارنجی مشخص شده‌اند" v-html="svg" />
</template>

<style scoped>
.car-diagram { margin: 0; }
.car-diagram :deep(svg) { width: 100%; height: auto; display: block; }
.car-diagram :deep(.part--damaged) {
  fill: var(--damaged);
  fill-opacity: 0.5;
}
</style>