<script setup lang="ts">
import { computed } from 'vue';
import { Beatmap } from '../composables/getBeatmapSet';
import { OmdbBeatmap } from '../composables/useApi';
import BeatmapRating from './BeatmapRating.vue';

const props = defineProps<{
  beatmap: Beatmap,
  omdbBeatmap?: OmdbBeatmap
}>()

const emit = defineEmits<{
  (event: 'rate', rating: number): void
}>()

const maxVotes = computed(() => (Object.values(props.omdbBeatmap?.Ratings ?? {}) as number[]).reduce((a, b) => Math.max(a, b), 0))

console.log(maxVotes.value, props.omdbBeatmap?.Ratings)

</script>

<template>
  <div v-if="omdbBeatmap" class="beatmap-info">
    <dl>
      <dt>Rating</dt>
      <dd>
        <template v-if="omdbBeatmap.WeightedAvg != null">
          {{ omdbBeatmap.WeightedAvg?.toFixed(1) }} / 5.0 from {{ omdbBeatmap.RatingCount }} {{ omdbBeatmap.RatingCount === 1 ? 'votes' : 'votes' }}
        </template>
        <template v-else>
          No votes yet.
        </template>
      </dd>
    </dl>
    <div class="beatmapset-stats__rating-chart">
      <div class="stacked-bar-chart stacked-bar-chart--beatmap-fail-rate">
        <div v-for="i in 10" class="stacked-bar-chart__col" 
          :title="`${(i / 2).toFixed(1)} - ${omdbBeatmap.Ratings[(i / 2).toFixed(1)] ?? 0} ${omdbBeatmap.Ratings[(i / 2).toFixed(1)] === 1 ? 'vote' : 'votes'}`">
          <div class="stacked-bar-chart__entry"
            :style="{ height: `calc(${100 * (omdbBeatmap.Ratings[(i / 2).toFixed(1)] ?? 0) / (maxVotes || 1)}% + 1px)` }">
          </div>

        </div>
      </div>

    </div>
    <div class="spacer"></div>
    <dl>
      <dt class="text-right">Submit rating</dt>
      <dd class="omdb-rating">
        <BeatmapRating :rating="omdbBeatmap.OwnRating ?? omdbBeatmap.WeightedAvg ?? 0"
          :has-own-rating="omdbBeatmap.OwnRating != null" @rate="emit('rate', $event)" />
      </dd>
    </dl>
  </div>
</template>

<style scoped>
.beatmap-info {
  display: flex;
  gap: 2rem;
  align-items: flex-end;
}

.spacer {
  flex-grow: 1;
}

.beatmapset-stats__rating-chart {
  width: 150px;
}

dl {
  margin-bottom: 0;

}
</style>