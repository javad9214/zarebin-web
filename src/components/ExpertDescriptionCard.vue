<script setup>
defineProps({
  report: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="card expert-description">
    <h2 class="card__title">توضیحات کارشناس</h2>
    <p class="expert-description__text">{{ report.expertDescription || '—' }}</p>
  </section>
</template>

<style scoped>
.expert-description__text {
  font-size: 0.9375rem;
  line-height: 1.9;
  color: var(--green-dark);
  white-space: pre-line;
}
</style>
