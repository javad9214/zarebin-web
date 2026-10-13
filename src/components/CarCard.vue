<script setup>
defineProps({
  report: {
    type: Object,
    required: true,
  },
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
        <dd dir="ltr">{{ report.plateNumber }}</dd>
      </div>
    </dl>
  </section>
</template>
