import net from 'net'

import { HttpRequest, HttpResponse } from '@brtmvdl/backend'

import { Logger } from '@brtmvdl/logger'

import { PORT } from './config.js'

import app from './app.js'

const logger = new Logger('INDEX')

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    const req = new HttpRequest(data.toString())
    const res = new HttpResponse(req)
    const str = app.run(req, res).toString()
    socket.write(str)
    socket.end()
  })
})

server.listen(PORT, () => logger.log(`Server runnig on ${PORT}.`))
