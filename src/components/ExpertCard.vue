<script setup>
import { computed } from 'vue'
import { toInternationalPhone } from '@/utils/phone'

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
})

const phone = computed(() => toInternationalPhone(props.report.expertPhoneNumber))

// wa.me needs the international format without "+"
const whatsappNumber = computed(() => phone.value.replace('+', ''))
</script>

<template>
  <section class="card expert-card">
    <h2 class="card__title">کارشناس</h2>
    <div class="expert-card__info">
      <p class="expert-card__name">{{ report.expertName }}</p>
      <p class="expert-card__phone" dir="ltr">{{ phone }}</p>
    </div>
    <div class="expert-card__actions">
      <a class="expert-card__btn expert-card__btn--call" :href="`tel:${phone}`">
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
