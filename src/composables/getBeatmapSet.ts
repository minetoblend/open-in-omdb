

export interface Beatmapset {
  id: number,
  beatmaps: Beatmap[]
}

export interface Beatmap {
  id: number
}

export function getBeatmapSet(): Beatmapset | undefined {
  const element = document.querySelector("#json-beatmapset")
  if (!element) return undefined

  const beatmap = JSON.parse(element.innerHTML);

  return beatmap;
}