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
    <h2 class="card__title">مشخصات مشتری</h2>
    <dl class="data-list">
      <div class="data-list__row">
        <dt>نام و نام خانوادگی</dt>
        <dd>{{ report.fullName }}</dd>
      </div>
      <div class="data-list__row">
        <dt>شماره تماس</dt>
        <dd dir="ltr">{{ report.phoneNumber }}</dd>
      </div>
    </dl>
  </section>
</template>
