<script setup>
import { computed } from 'vue'

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
})

// wa.me needs the international format without "+" — convert a leading 0 to 98
const whatsappNumber = computed(() =>
  props.report.expertPhoneNumber.replace(/\D/g, '').replace(/^0/, '98'),
)
</script>

<template>
  <section class="card expert-card">
    <h2 class="card__title">کارشناس</h2>
    <div class="expert-card__info">
      <p class="expert-card__name">{{ report.expertName }}</p>
      <p class="expert-card__phone" dir="ltr">{{ report.expertPhoneNumber }}</p>
    </div>
    <div class="expert-card__actions">
      <a class="expert-card__btn expert-card__btn--call" :href="`tel:${report.expertPhoneNumber}`">
        تماس
      </a>
      <a
        class="expert-card__btn expert-card__btn--whatsapp"
        :href="`https://wa.me/${whatsappNumber}`"
        target="_blank"
        rel="noopener"
      >
        واتساپ
      </a>
    </div>
  </section>
</template>

<style scoped>
.expert-card__info {
  margin-bottom: 14px;
}

.expert-card__name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--green-dark);
}

.expert-card__phone {
  margin-top: 2px;
  font-size: 0.875rem;
  color: var(--green);
}

.expert-card__actions {
  display: flex;
  gap: 10px;
}

.expert-card__btn {
  flex: 1;
  padding: 10px 0;
  border-radius: 12px;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: none;
}

.expert-card__btn--call {
  background: var(--green);
  color: #fff;
}

.expert-card__btn--whatsapp {
  background: var(--soft);
  color: var(--green-dark);
}
</style>
