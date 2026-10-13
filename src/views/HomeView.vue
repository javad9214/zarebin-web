<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import logo from '@/assets/logo.png'

const router = useRouter()

const code = ref('')
const invalid = ref(false)

// Accepts a bare UUID or a whole pasted report link and extracts the key.
const UUID_PATTERN = /([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i

function submit() {
  const match = code.value.trim().match(UUID_PATTERN)
  if (!match) {
    invalid.value = true
    return
  }
  invalid.value = false
  router.push({ name: 'report', params: { publicId: match[1].toLowerCase() } })
}
</script>

<template>
  <div class="home">
    <header class="home__header">
      <div class="home__brand">
        <img class="home__logo" :src="logo" alt="">
        <span class="home__title">ذره‌بین / کارشناسی خودرو</span>
      </div>
    </header>

    <main class="home__content">
      <div class="card home__card">
        <h1 class="home__heading">مشاهده گزارش کارشناسی</h1>
        <p class="home__text">
          کد گزارشی که کارشناس برای شما ارسال کرده را وارد کنید تا نتیجهٔ کارشناسی خودروی خود را ببینید.
        </p>

        <form class="home__form" @submit.prevent="submit">
          <label class="home__label" for="report-code">کد گزارش</label>
          <input
            id="report-code"
            v-model="code"
            class="home__input"
            :class="{ 'home__input--error': invalid }"
            type="text"
            inputmode="verbatim"
            autocomplete="off"
            autocapitalize="off"
            spellcheck="false"
            dir="ltr"
            placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
            @input="invalid = false"
          >
          <p v-if="invalid" class="home__error" role="alert">
            کد واردشده معتبر نیست؛ لطفاً کد را کامل و دقیق وارد کنید.
          </p>
          <button class="home__submit" type="submit">مشاهده گزارش</button>
        </form>

        <p class="home__hint">می‌توانید لینک گزارش را هم مستقیم در همین کادر جای‌گذاری کنید.</p>
      </div>
    </main>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
}

.home__header {
  padding: 14px 16px;
  background: var(--green);
  color: #fff;
}

.home__brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.home__logo {
  width: 28px;
  height: 28px;
  border-radius: 8px;
}

.home__title {
  font-weight: 700;
  font-size: 1rem;
}

.home__content {
  display: grid;
  align-content: start;
  justify-items: center;
  gap: 16px;
  max-width: 1120px;
  min-height: calc(100vh - 56px);
  margin-inline: auto;
  padding: 48px 16px;
}

.home__card {
  width: 100%;
  max-width: 440px;
  padding: 28px 20px;
  text-align: center;
}

.home__heading {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--green-dark);
}

.home__text {
  margin-top: 10px;
  font-size: 0.875rem;
  line-height: 1.9;
  color: var(--green);
}

.home__form {
  margin-top: 24px;
  text-align: right;
}

.home__label {
  display: block;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--green);
}

.home__input {
  width: 100%;
  margin-top: 8px;
  padding: 12px 14px;
  border: 1.5px solid var(--soft);
  border-radius: 12px;
  font-family: 'Vazirmatn', monospace;
  font-size: 0.875rem;
  letter-spacing: 0.02em;
  color: var(--green-dark);
  background: #fff;
  outline: none;
  transition: border-color 0.15s ease;
}

.home__input:focus {
  border-color: var(--green);
}

.home__input--error,
.home__input--error:focus {
  border-color: var(--damaged);
}

.home__error {
  margin-top: 8px;
  font-size: 0.8125rem;
  line-height: 1.8;
  color: var(--damaged-text);
}

.home__submit {
  width: 100%;
  margin-top: 16px;
  padding: 12px 32px;
  border: none;
  border-radius: 12px;
  background: var(--green);
  color: #fff;
  font-size: 0.9375rem;
  font-weight: 700;
  transition: background-color 0.15s ease;
}

.home__submit:hover {
  background: var(--green-dark);
}

.home__hint {
  margin-top: 20px;
  font-size: 0.75rem;
  line-height: 1.8;
  color: var(--green);
  opacity: 0.8;
}

@media (min-width: 1024px) {
  .home__header {
    padding: 20px 32px;
  }

  .home__logo {
    width: 36px;
    height: 36px;
  }

  .home__title {
    font-size: 1.25rem;
  }

  .home__card {
    padding: 40px 36px;
  }

  .home__heading {
    font-size: 1.5rem;
  }
}
</style>
