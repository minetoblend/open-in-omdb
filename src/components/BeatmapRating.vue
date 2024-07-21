<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  rating: number
  hasOwnRating?: boolean
}>()

const emit = defineEmits<{
  (event: 'rate', rating: number): void
}>()

const hoveringStar = ref<number>()

const displayedRating = computed(() => {
  return hoveringStar.value ?? props.rating
})

const stars = computed(() => {
  return Array.from({ length: 5 }, (_, i) => getIcon(i + 1))
})

function getIcon(i: number,): { active: boolean, icon: string } {
  i = Math.round(i * 2) / 2

  if (displayedRating.value >= i) {
    return { active: props.hasOwnRating, icon: 'fas fa-fw fa-star' }
  } else if (displayedRating.value >= i - 0.5) {
    return { active: props.hasOwnRating, icon: 'fas fa-fw fa-star-half-alt' }
  } else {
    return { active: false, icon: 'far fa-fw fa-star' }
  }
}


function getHoveringHalf(evt: MouseEvent): 'left' | 'right' {
  const rect = (evt.target as HTMLElement).getBoundingClientRect()
  const x = evt.clientX - rect.left
  const half = rect.width / 2
  if (x < half) {
    return 'left'
  } else {
    return 'right'
  }
}

function onMouseOver(evt: MouseEvent, i: number) {
  const half = getHoveringHalf(evt)
  hoveringStar.value = i - (half === 'left' ? 0.5 : 0)
}

function onMouseOut() {
  hoveringStar.value = undefined

}

function onMouseMove(evt: MouseEvent, i: number) {
  const half = getHoveringHalf(evt)
  hoveringStar.value = i - (half === 'left' ? 0.5 : 0)
}

function onStarClick(evt: MouseEvent, i: number) {
  const half = getHoveringHalf(evt)
  const rating = i - (half === 'left' ? 0.5 : 0)
  emit('rate', rating)
}

</script>

<template>
  <div v-for="({ active, icon }, index) in stars" 
    class="contest__voting-star"
    :class="{ 'contest__voting-star--selected': active }" 
    @mouseover="onMouseOver($event, index + 1)"
    @mousemove="onMouseMove($event, index + 1)"
    @mouseout="onMouseOut" 
    @click="onStarClick($event, index + 1)">
    <span :class="icon" />
  </div>
  <div v-if="hasOwnRating" class="contest__voting-star" @click="emit('rate', -2)">
    <span class="fas fa-fw fa-times-circle"></span>
  </div>
</template>