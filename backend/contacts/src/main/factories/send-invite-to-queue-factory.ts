import { WebController } from 'src/infra/http/web-controller'
import SendToQueue from 'src/aplication/use-case/send-to-queue/send-to-queue'
import KafkaAdpter from 'src/infra/queue/kafka/kafka-adpter'
import { SendInviteController } from 'src/presentation/controllers/send-invite'
import { environment } from '../config/config'

export const makeSendInviteToQueueController = (): WebController => {
	const kafkaAdpter = new KafkaAdpter(environment.clientId, [environment.brokers])
	const usecase = new SendToQueue(kafkaAdpter, 'invites')
	const controller = new WebController(new SendInviteController(usecase))
	return controller
}