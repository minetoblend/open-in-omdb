import { ManifestV3Export } from "@crxjs/vite-plugin"

const manifest: ManifestV3Export = {
  manifest_version: 3,
  name: "omdb+",
  version: "1.0.0",
  action: {
    default_popup: "options.html"
  },
  content_scripts: [
    {
      matches: ['https://osu.ppy.sh/*'],
      js: ['src/content-script.ts']
    }
  ],
  "permissions": [
    "storage"
  ],
}

export default manifest