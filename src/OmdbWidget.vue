<script setup lang="ts">
import MapsetCard from './components/MapsetCard.vue';

defineProps<{ mapsetId: number }>()

</script>

<template>
  <Suspense>
    <MapsetCard />
  </Suspense>
</template>


