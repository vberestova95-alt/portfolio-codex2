import { copyFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'

const routes = [
  'betboom-pass',
  'cat-app',
  'design-concepts',
  'iquoto',
  'kokoc-group',
  'yandex-turkey',
]

const distDirectory = new URL('../dist/', import.meta.url)
const source = new URL('index.html', distDirectory)

await Promise.all(
  routes.map(async (route) => {
    const routeDirectory = new URL(`${route}/`, distDirectory)
    await mkdir(routeDirectory, { recursive: true })
    await copyFile(source, join(routeDirectory.pathname, 'index.html'))
  }),
)
