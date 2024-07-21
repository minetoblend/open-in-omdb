export interface Options {
  apiKey: string
}

export function loadOptions(): Promise<Options> {
  return chrome.storage.sync.get({ apiKey: '' }) as Promise<Options>
}

export async function saveOptions(options: Options) {
  await chrome.storage.sync.set(options)
  return options
}