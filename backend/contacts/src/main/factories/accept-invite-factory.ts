import ConnectionMongoDb from 'src/infra/connection/connectionMongoDb'
import { WebController } from 'src/infra/http/web-controller'
import UserRepositoryMongo from 'src/infra/repository/user-repository-mongo'
import { environment } from '../config/config'
import ContactsRepositoryMongo from 'src/infra/repository/contacts-repository-mongo'
import AcceptContact from 'src/aplication/use-case/accept-contact/accept-contact'
import KafkaAdpter from 'src/infra/queue/kafka/kafka-adpter'
import InviteRepositoryMongoDb from 'src/infra/repository/invite-repository'
import { AcceptContactController } from 'src/presentation/controllers/accept-contact'

export const makeAcceptContactController = (): WebController => {
	const mongoDbDriveAdpter: ConnectionMongoDb = new ConnectionMongoDb(environment.MONGODB_URI,environment.MONGODB_NAME)
	const userRepository = new UserRepositoryMongo(mongoDbDriveAdpter)
	const contactsRepository = new ContactsRepositoryMongo(mongoDbDriveAdpter)
	const inviteRepository = new InviteRepositoryMongoDb(mongoDbDriveAdpter)
	const kafkaAdpter = new KafkaAdpter(environment.clientId, [environment.brokers])
	const usecase = new AcceptContact(userRepository,inviteRepository,contactsRepository,kafkaAdpter)
	const controller = new WebController(new AcceptContactController(usecase))
	return controller
}