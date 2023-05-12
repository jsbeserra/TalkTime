import SendMessage from 'src/aplication/use-case/messages/send-message/send-message'
import Messenger from 'src/domain/messenger'
import ConnectionMongoDb from 'src/infra/connection/connectionMongoDb'
import MessagesRepositoryMongoDb from 'src/infra/repository/messages-repository-mongo'
import UserRepositoryMongo from 'src/infra/repository/user-repository-mongo'
import { environment } from '../config/config'

export const makeSendMessage = (messenger:Messenger) => {
	const mongoDbDriveAdpter: ConnectionMongoDb = new ConnectionMongoDb(environment.MONGODB_URI,environment.MONGODB_NAME)
	const userRepository = new UserRepositoryMongo(mongoDbDriveAdpter)
	const messagesRepository = new MessagesRepositoryMongoDb(mongoDbDriveAdpter)
	const usecase = new SendMessage(messagesRepository,userRepository,messenger)
	return usecase
}