<script setup>
import logo from '@/assets/logo.png'

import { formatPersianDate } from '@/utils/date'

defineProps({
  report: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <header class="app-header">
    <div class="app-header__brand">
      <img class="app-header__logo" :src="logo" alt="">
      <span class="app-header__title">ذره‌بین / کارشناسی خودرو</span>
    </div>
    <div class="app-header__date">{{ formatPersianDate(report.inspectionDate) }}</div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  background: var(--green);
  color: #fff;
}

.app-header__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.app-header__logo {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  flex-shrink: 0;
}

.app-header__title {
  font-weight: 700;
  font-size: 1rem;
}

.app-header__date {
  font-size: 0.8125rem;
  color: var(--soft);
  white-space: nowrap;
}

@media (min-width: 1024px) {
  .app-header {
    padding: 20px 32px;
  }

  .app-header__logo {
    width: 36px;
    height: 36px;
  }

  .app-header__title {
    font-size: 1.25rem;
  }

  .app-header__date {
    font-size: 1rem;
  }
}
</style>
