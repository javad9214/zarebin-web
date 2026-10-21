<script setup>
defineProps({
  report: {
    type: Object,
    required: true,
  },
})

const rows = [
  { key: 'roof', label: 'سقف' },
  { key: 'frontChassis', label: 'شاسی جلو' },
  { key: 'rearChassis', label: 'شاسی عقب' },
  { key: 'pillars', label: 'ستون‌ها' },
  { key: 'frontLeftFender', label: 'گلگیر جلو چپ' },
  { key: 'frontRightFender', label: 'گلگیر جلو راست' },
  { key: 'rearLeftFender', label: 'گلگیر عقب چپ' },
  { key: 'rearRightFender', label: 'گلگیر عقب راست' },
  { key: 'hood', label: 'کاپوت' },
  { key: 'trunk', label: 'صندوق' },
  { key: 'frontLeftDoor', label: 'درب جلو چپ' },
  { key: 'frontRightDoor', label: 'درب جلو راست' },
  { key: 'rearLeftDoor', label: 'درب عقب چپ' },
  { key: 'rearRightDoor', label: 'درب عقب راست' },
]
</script>

<template>
  <section class="card panel-list">
    <h2 class="card__title">وضعیت قطعات بدنه</h2>

    <p class="panel-list__legend">
      <span class="panel-list__legend-item">
        <span class="panel-list__dot panel-list__dot--damaged"></span>
        دارد: رنگ‌شده یا تعمیرشده
      </span>
      <span class="panel-list__legend-item">
        <span class="panel-list__dot panel-list__dot--healthy"></span>
        ندارد: سالم
      </span>
    </p>

    <ul class="panel-list__rows">
      <li v-for="row in rows" :key="row.key" class="panel-list__row">
        <span class="panel-list__label">{{ row.label }}</span>
        <span
          class="panel-list__pill"
          :class="report[row.key] ? 'panel-list__pill--damaged' : 'panel-list__pill--healthy'"
        >
          {{ report[row.key] ? 'دارد' : 'ندارد' }}
        </span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.panel-list__legend {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 16px;
  margin-bottom: 12px;
  font-size: 0.75rem;
  color: var(--green);
}

.panel-list__legend-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.panel-list__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.panel-list__dot--damaged {
  background: var(--damaged);
}

.panel-list__dot--healthy {
  background: var(--green);
}

.panel-list__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 9px 0;
}

.panel-list__row + .panel-list__row {
  border-top: 1px solid var(--bg);
}

.panel-list__label {
  font-size: 0.9375rem;
  color: var(--green-dark);
}

.panel-list__pill {
  flex-shrink: 0;
  padding: 2px 14px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
}

.panel-list__pill--damaged {
  background: var(--damaged-bg);
  color: var(--damaged-text);
}

.panel-list__pill--healthy {
  background: var(--soft);
  color: var(--green);
}

/* The list sits next to the diagram inside a column narrower than the
 * viewport, so switch to two columns based on the card's own width. */
.panel-list {
  container-type: inline-size;
}

@container (min-width: 360px) {
  .panel-list__rows {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 24px;
  }
}
</style>
