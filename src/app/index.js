import net from 'net'
import { HttpRequest, HttpResponse } from '@brtmvdl/backend'
import { Logger } from '@brtmvdl/logger'
import { PORT } from './config.js'
import app from './app.js'

const logger = new Logger('INDEX')

const server = net.createServer((socket) => socket.on('data', (data) => {
  const http_req = new HttpRequest(data.toString())
  const http_res = new HttpResponse(http_req)
  app.run(http_req, http_res)
    .catch((err) => http_res.setError(err))
    .then((res) => socket.write(res.toString()))
    .then(() => socket.end())
})
)

server.listen(PORT, () => logger.log(`Server runnig on ${PORT}.`))
