<script setup>
import { computed } from 'vue'
// Adjust the file name/extension to match your asset.
import iranFlag from '@/assets/iran_flag_icon.svg'

const props = defineProps({
  /** Parsed plate parts from utils/plate.js parsePlate(). */
  plate: {
    type: Object,
    required: true,
  },
})

// Real plates print Persian numerals; the API string carries ASCII digits,
// so convert for display only.
function fa(value) {
  return value.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d])
}

const parts = computed(() => ({
  firstTwo: fa(props.plate.firstTwo),
  threeDigits: fa(props.plate.threeDigits),
  letter: props.plate.letter,
  iranCode: fa(props.plate.iranCode),
}))

const ariaLabel = computed(
  () => `پلاک ${parts.value.firstTwo} ${parts.value.letter} ${parts.value.threeDigits} ایران ${parts.value.iranCode}`,
)
</script>

<template>
  <!-- Display-only plate, laid out left→right like the real thing:
       blue strip (flag + IR IRAN) | 3-digit group | letter | 2-digit group | ایران + province code. -->
  <div class="plate" dir="ltr" role="img" :aria-label="ariaLabel">
    <span class="plate__strip" aria-hidden="true">
      <img :src="iranFlag" alt="" class="plate__flag" />
      <span>IR<br />IRAN</span>
    </span>
    <span class="plate__main" aria-hidden="true">
      <span class="plate__three">{{ parts.threeDigits }}</span>
      <span class="plate__letter">{{ parts.letter }}</span>
      <span class="plate__two">{{ parts.firstTwo }}</span>
    </span>
    <span class="plate__iran" aria-hidden="true">
      <span class="plate__iran-word">ایران</span>
      <span class="plate__iran-code">{{ parts.iranCode }}</span>
    </span>
  </div>
</template>

<style scoped>
.plate {
  display: inline-flex;
  align-items: stretch;
  height: 46px;
  min-width: 176px;
  background: #fff;
  border: 2px solid #2b2b2b;
  border-radius: 6px;
  overflow: hidden;
  color: #111;
  user-select: none;
}

/* Blue of the "IR IRAN" band on real plates; matches the Android app. */
.plate__strip {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  width: 24px;
  background: #153e90;
  color: #fff;
  font-size: 0.5rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.5px;
  text-align: center;
}

.plate__flag {
  width: 14px;
  height: 10px;
  object-fit: contain;
}

.plate__main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-inline: 6px;
  font-size: 1.25rem;
  font-weight: 800;
}

.plate__letter {
  font-size: 1.0625rem;
}

/* Province code on the far right, separated by a thin divider. */
.plate__iran {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-inline: 8px;
  border-inline-start: 1px solid #111;
}

.plate__iran-word {
  font-size: 0.5625rem;
  font-weight: 800;
  line-height: 1.2;
}

.plate__iran-code {
  font-size: 0.9375rem;
  font-weight: 800;
  line-height: 1.2;
}
</style>