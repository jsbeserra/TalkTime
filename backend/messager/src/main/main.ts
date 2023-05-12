import 'dotenv/config'

import express from 'express'
import { createServer } from 'http'
import { makeSocketIo } from './factories/socketio-factory'

const app = express()
const httpServer = createServer(app)

const socket = makeSocketIo()
socket.start(httpServer)

httpServer.listen(process.env.PORT, () => {
	console.log('Servidor Socket.IO está ouvindo na porta ' + process.env.PORT)
})