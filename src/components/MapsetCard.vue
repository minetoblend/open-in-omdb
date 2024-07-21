<script setup lang="ts">
import { computed, ref } from 'vue';
import { loadOptions } from '../composables/useOptions';
import BeatmapInfo from './BeatmapInfo.vue';
import Options from '../Options.vue';
import { useActiveBeatmap } from '../composables/useActiveBeatmap';
import { OmdbBeatmap, useApi } from '../composables/useApi';

const options = ref(await loadOptions())

const showOptions = ref(false)
const needsApiKey = computed(() => options.value.apiKey.length === 0)

async function onOptionsSaved() {
  showOptions.value = false
  options.value = await loadOptions()
}

const { activeBeatmap, mapset } = useActiveBeatmap()

const api = useApi(() => options.value.apiKey)

const omdbBeatmaps = ref(await api.getMapsetInfo(mapset!.id))

const activeOmdbBeatmap = computed(() => omdbBeatmaps.value.find(b => b.BeatmapID === activeBeatmap.value?.id))

async function rate(beatmap: OmdbBeatmap, rating: number) {
  await api.submitRating(beatmap.BeatmapID, rating)
  omdbBeatmaps.value = await api.getMapsetInfo(mapset!.id)
}
</script>

<template>
  <div class="header">
    <a class="header-title" href="https://omdb.nyahh.net/">OMDB</a>
    <button class="toggle-options btn-osu-big" @click="showOptions = !showOptions">Settings</button>
  </div>
  <template v-if="showOptions || needsApiKey">
    <p v-if="needsApiKey">Api key is required to display ratings.</p>
    <Suspense>
      <Options @save="onOptionsSaved" />
    </Suspense>
  </template>
  <template v-else-if="!needsApiKey">
    <BeatmapInfo v-if="activeBeatmap" :beatmap="activeBeatmap" :omdb-beatmap="activeOmdbBeatmap"
      @rate="rate(activeOmdbBeatmap!, $event)" />
  </template>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}
</style>