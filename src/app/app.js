import { Router } from '@brtmvdl/backend'
import * as libs from './libs/index.js'

const router = new Router()

router.get('/', (_, res) => res)

router.get('/html/json', async (_, res) => {
  const json = await libs.HTML.JSON('')
  return res.setJSON(json)
})

export default router
