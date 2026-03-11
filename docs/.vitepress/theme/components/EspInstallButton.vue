<template>
  <div class="esp-install-wrapper">
    <div v-if="!supported" class="unsupported">
      Your browser does not support WebSerial. Use Chrome or Edge on desktop.
    </div>
    <div v-else class="install-button">
      <esp-web-install-button :manifest="manifestUrl">
        <button slot="activate" class="brand-button">Install Immich Frame</button>
      </esp-web-install-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const manifestUrl = './firmware/manifest.json'
const supported = ref(true)

onMounted(async () => {
  supported.value = 'serial' in navigator
  await import('https://unpkg.com/esp-web-tools@10/dist/web/install-button.js')
})
</script>

<style scoped>
.esp-install-wrapper {
  margin: 1.5rem 0;
}

.brand-button {
  display: inline-block;
  border: 1px solid transparent;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
  border-radius: 20px;
  padding: 0 20px;
  line-height: 38px;
  font-size: 14px;
  color: var(--vp-button-brand-text);
  background-color: var(--vp-button-brand-bg);
  cursor: pointer;
}

.brand-button:hover {
  background-color: var(--vp-button-brand-hover-bg);
}

.unsupported {
  padding: 12px 16px;
  border-radius: 8px;
  background-color: var(--vp-c-warning-soft);
  color: var(--vp-c-warning-1);
  font-size: 14px;
}
</style>
