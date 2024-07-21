<script setup lang="ts">
import { ref } from 'vue';
import { loadOptions, saveOptions } from './composables/useOptions'

const options = ref(await loadOptions())


const saved = ref(false)

const emit = defineEmits(['save'])

async function save() {
  await saveOptions(options.value)
  saved.value = true
  emit('save')
}
</script>

<template>
  <div class="options">
    <div class="form-field">
      <label for="api-key">API Key</label>
      <input class="form-text" id="api-key" v-model="options.apiKey" />
    </div>
    <button class="btn-osu-big" @click="save">
      <span class="btn-osu-big__content">Save</span>
    </button>
    <div v-if="saved">Saved!</div>
  </div>
</template>

<style scoped>
.options {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5rem;
  max-width: 500px;
}

.form-field {
  display: flex;
  gap: 1rem;
  width: 100%;
}

#api-key {
  flex-grow: 1;
}
</style>