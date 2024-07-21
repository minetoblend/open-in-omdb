import { tryInjectOmdbComponent } from "./inject"

addEventListener('turbolinks:load', tryInjectOmdbComponent)
addEventListener('load', tryInjectOmdbComponent)
tryInjectOmdbComponent()