import { computed, ref } from "vue";
import { getBeatmapSet } from "./getBeatmapSet";

export function useActiveBeatmap() {

  const mapset = getBeatmapSet()

  const activeBeatmapId = ref<number>(mapset?.beatmaps[0].id ?? 0)

  const activeBeatmap = computed(() => mapset?.beatmaps.find(b => b.id === activeBeatmapId.value))

  document.querySelectorAll(".beatmapset-beatmap-picker__beatmap")
    .forEach((button) => {
      const beatmapId = parseInt(
        button.getAttribute("href")!.split("/").pop()!
      );

      if (button.classList.contains("beatmapset-beatmap-picker__beatmap--active"))
        activeBeatmapId.value = beatmapId

      button.addEventListener("click", () => {
        activeBeatmapId.value = beatmapId
      })
    })

  return {
    mapset,
    activeBeatmapId,
    activeBeatmap,
  }
}