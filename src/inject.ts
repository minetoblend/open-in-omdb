import { App, createApp } from "vue"
import OmdbWidget from "./OmdbWidget.vue"

const beatmapPathRegex = /\/beatmapsets\/(\d+)$/

let runningApp: App | null = null

export function tryInjectOmdbComponent() {
    if (runningApp) {
        runningApp.unmount()
        runningApp = null
    }
    
    const oldContent = document.getElementById('omdb-root')
    if (oldContent)
        oldContent.remove()

    const path = location.pathname
    
    if (!beatmapPathRegex.test(path))
        return

    const mapsetId = parseInt(path.match(beatmapPathRegex)?.[1] ?? '')

    const container = document.getElementsByClassName('user-profile-pages')[0]
    if (container && !isNaN(mapsetId)) {
        const target = document.createElement('div')
        target.id = 'omdb-root'
        target.className = 'page-extra'
        container.prepend(target)

        

        const app = createApp(OmdbWidget, { mapsetId })
        app.mount(target)
        runningApp = app
    }
}