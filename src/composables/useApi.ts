import { MaybeRefOrGetter, toValue } from "vue";

export interface OmdbBeatmap {
  Artist: string | null
  BeatmapID: number
  ChartRank: number | null
  ChartYearRank: number | null
  Difficulty: string
  OwnRating: number | null
  RatingCount: number
  Ratings: {
    [key: string]: number
  }
  Title: string | null
  WeightedAvg: number | null
}

export function useApi(apiKey: MaybeRefOrGetter<string>) {

  async function getMapsetInfo(id: number) : Promise<OmdbBeatmap[]> {
    const response = await fetch(`https://omdb.nyahh.net/api/set/${id}?key=${toValue(apiKey)}`)

    const json = await response.json()
    return json as OmdbBeatmap[]
  }

  async function submitRating(beatmapId: number, rating: number) {
    const response = await fetch(`https://omdb.nyahh.net/api/rate/${beatmapId}?key=${toValue(apiKey)}&score=${rating}`)

    return await response.json()  
  }


  return {
    getMapsetInfo,
    submitRating,
  }
}