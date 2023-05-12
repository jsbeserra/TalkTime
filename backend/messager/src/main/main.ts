import 'dotenv/config'

import express from 'express'
import { createServer } from 'http'
import { makeSocketIo } from './factories/socketio-factory'
import KafkaAdpter from 'src/infra/queue/kafka/kafka-adpter'
import { makeSaveMessagesQueueConsumerUseCase } from './factories/save-messages-queue'

const app = express()
const httpServer = createServer(app)
const kafkaAdpter = new KafkaAdpter(process.env.CLIENTID,[process.env.BROKERS])
const socket = makeSocketIo(kafkaAdpter)
makeSaveMessagesQueueConsumerUseCase(kafkaAdpter)
socket.start(httpServer)
httpServer.listen(process.env.PORT, () => {
	console.log('Servidor Socket.IO está ouvindo na porta ' + process.env.PORT)
})