<script setup>
defineProps({
  report: {
    type: Object,
    required: true,
  },
})

// Polygon coordinates in the 499x669 viewBox, calibrated to car-diagram.png.
const parts = [
  { key: 'hood', points: '168,100 320,100 320,205 168,205' },
  { key: 'roof', points: '187,272 303,272 303,434 187,434' },
  { key: 'trunk', points: '182,478 304,478 304,524 182,524' },
  { key: 'frontLeftFender', points: '78,96 130,90 146,150 146,222 78,222' },
  { key: 'frontRightFender', points: '412,96 360,90 344,150 344,222 412,222' },
  { key: 'rearLeftFender', points: '78,410 150,432 148,520 120,535 78,535' },
  { key: 'rearRightFender', points: '412,410 340,432 342,520 370,535 412,535' },
  { key: 'frontLeftDoor', points: '82,226 142,226 178,262 184,328 82,328' },
  { key: 'frontRightDoor', points: '408,226 348,226 312,262 306,328 408,328' },
  { key: 'rearLeftDoor', points: '82,330 184,330 182,395 150,432 82,418' },
  { key: 'rearRightDoor', points: '408,330 306,330 308,395 340,432 408,418' },
]
</script>

<template>
  <figure class="car-diagram">
    <img class="car-diagram__image" src="@/assets/car-diagram.png" alt="">
    <svg
      class="car-diagram__overlay"
      viewBox="0 0 499 669"
      aria-label="دیاگرام بدنه خودرو؛ قطعات رنگ‌شده یا تعمیرشده با رنگ نارنجی مشخص شده‌اند"
    >
      <g transform="scale(1.018 1.02)">
        <polygon
          v-for="part in parts"
          :key="part.key"
          class="car-diagram__part"
          :class="{ 'car-diagram__part--damaged': report[part.key] }"
          :points="part.points"
        />
      </g>
    </svg>
  </figure>
</template>

<style scoped>
.car-diagram {
  position: relative;
  margin: 0;
}

.car-diagram__image {
  width: 100%;
}

.car-diagram__overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* SVG default fill is black, so healthy parts need an explicit transparent fill */
.car-diagram__part {
  fill: transparent;
}

.car-diagram__part--damaged {
  fill: var(--damaged);
  fill-opacity: 0.5;
  stroke: var(--damaged);
  stroke-width: 2;
  stroke-linejoin: round;
}
</style>
