<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useReport } from '@/composables/useReport'
import AppHeader from '@/components/AppHeader.vue'
import CustomerCard from '@/components/CustomerCard.vue'
import CarCard from '@/components/CarCard.vue'
import CarDiagram from '@/components/CarDiagram.vue'
import PanelList from '@/components/PanelList.vue'
import ExpertDescriptionCard from '@/components/ExpertDescriptionCard.vue'
import ExpertCard from '@/components/ExpertCard.vue'
import TermsCard from '@/components/TermsCard.vue'

const route = useRoute()
const { report, loading, error, reload } = useReport(computed(() => route.params.publicId))

// 404 = unknown share key, 400 = malformed key (e.g. a mistyped code)
const notFound = computed(() => error.value?.status === 404 || error.value?.status === 400)
</script>

<template>
  <!-- Loading: skeleton -->
  <div v-if="loading" class="report report--pending">
    <div class="report__skeleton-bar"></div>
    <div class="report__skeletons">
      <div class="card report__skeleton">
        <div class="sk sk--title"></div>
        <div class="sk sk--w60"></div>
        <div class="sk sk--w40"></div>
      </div>
      <div class="card report__skeleton">
        <div class="sk sk--title"></div>
        <div class="sk sk--w80"></div>
        <div class="sk sk--w90"></div>
        <div class="sk sk--w70"></div>
        <div class="sk sk--w85"></div>
        <div class="sk sk--w50"></div>
        <div class="sk sk--w75"></div>
      </div>
      <div class="card report__skeleton">
        <div class="sk sk--title"></div>
        <div class="sk sk--w70"></div>
        <div class="sk sk--w55"></div>
      </div>
    </div>
  </div>

  <!-- Error / not found -->
  <div v-else-if="error" class="report report--pending">
    <div class="card report__message">
      <p class="report__message-title">
        {{ notFound ? 'گزارش یافت نشد' : 'خطا در دریافت گزارش' }}
      </p>
      <p class="report__message-text">
        {{
          notFound
            ? 'گزارش مورد نظر وجود ندارد یا حذف شده است؛ لطفاً لینک را بررسی کنید.'
            : 'در ارتباط با سرور مشکلی پیش آمد. لطفاً دوباره تلاش کنید.'
        }}
      </p>
      <button v-if="!notFound" class="report__retry" @click="reload">تلاش دوباره</button>
    </div>
  </div>

  <!-- Loaded -->
  <div v-else class="report">
    <AppHeader :report="report" />

    <main class="report__content">
      <div class="report__main">
        <CarCard :report="report" class="report__car" />
        <div class="report__body">
          <div class="card report__diagram">
            <CarDiagram :report="report" />
          </div>
          <PanelList :report="report" />
        </div>
        <ExpertDescriptionCard :report="report" class="report__description" />
      </div>

      <div class="report__side">
        <CustomerCard :report="report" class="report__customer" />
        <TermsCard class="report__terms" />
        <ExpertCard :report="report" class="report__expert" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.report {
  min-height: 100vh;
}

.report__content {
  display: grid;
  gap: 16px;
  max-width: 1120px;
  margin-inline: auto;
  padding: 16px;
}

/*
 * Mobile: one column, cards in order
 * customer → car → body status → expert description → terms → expert.
 * The main/side wrappers only group for the desktop layout, so they are
 * flattened here and the flat order is restored with `order`.
 */
.report__main,
.report__side {
  display: contents;
}

.report__customer {
  order: 1;
}

.report__car {
  order: 2;
}

.report__body {
  order: 3;
}

.report__description {
  order: 4;
}

.report__terms {
  order: 5;
}

.report__expert {
  order: 6;
}

.report__body {
  display: grid;
  gap: 16px;
}

.report__diagram {
  padding: 12px;
}

@media (min-width: 1024px) {
  .report__content {
    grid-template-columns: 1fr 380px;
    gap: 24px;
    align-items: start;
    padding: 24px;
  }

  .report__main,
  .report__side {
    display: grid;
    gap: 24px;
  }

  /* Side column: customer on top, then expert, then terms */
  .report__customer {
    order: 1;
  }

  .report__expert {
    order: 2;
  }

  .report__terms {
    order: 3;
  }

  .report__body {
    grid-template-columns: minmax(240px, 300px) 1fr;
  }
}

/* ---- Pending states (loading / error) ---- */

.report--pending {
  display: grid;
  align-content: start;
  justify-items: center;
  gap: 16px;
  padding: 16px;
}

.report__skeleton-bar {
  width: 100%;
  height: 54px;
  border-radius: 0 0 18px 18px;
}

.report__skeletons {
  display: grid;
  gap: 16px;
  width: 100%;
  max-width: 640px;
}

.report__skeleton {
  display: grid;
  gap: 12px;
}

.sk {
  height: 14px;
  border-radius: 7px;
  background: linear-gradient(90deg, var(--bg) 25%, var(--soft) 50%, var(--bg) 75%);
  background-size: 200% 100%;
  animation: report-shimmer 1.4s ease-in-out infinite;
}

.sk--title {
  width: 35%;
  height: 18px;
}

.sk--w40 { width: 40%; }
.sk--w50 { width: 50%; }
.sk--w55 { width: 55%; }
.sk--w60 { width: 60%; }
.sk--w70 { width: 70%; }
.sk--w75 { width: 75%; }
.sk--w80 { width: 80%; }
.sk--w85 { width: 85%; }
.sk--w90 { width: 90%; }

@keyframes report-shimmer {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}

.report__message {
  width: 100%;
  max-width: 420px;
  padding: 32px 24px;
  text-align: center;
}

.report__message-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--green-dark);
}

.report__message-text {
  margin-top: 10px;
  font-size: 0.875rem;
  line-height: 1.8;
  color: var(--green);
}

.report__retry {
  margin-top: 20px;
  padding: 10px 32px;
  border: none;
  border-radius: 12px;
  background: var(--green);
  color: #fff;
  font-size: 0.875rem;
  font-weight: 700;
}
</style>
