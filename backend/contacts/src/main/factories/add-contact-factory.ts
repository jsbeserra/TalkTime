import ConnectionMongoDb from 'src/infra/connection/connectionMongoDb'
import { WebController } from 'src/infra/http/web-controller'
import UserRepositoryMongo from 'src/infra/repository/user-repository-mongo'
import { environment } from '../config/config'
import AddContactUseCase from 'src/aplication/use-case/add-contact/add-contact-use-case'
import ContactsRepositoryMongo from 'src/infra/repository/contacts-repository-mongo'
import { AddContactController } from 'src/presentation/controllers/add-contact'

export const makeAddContactController = (): WebController => {
	const mongoDbDriveAdpter: ConnectionMongoDb = new ConnectionMongoDb(environment.MONGODB_URI,environment.MONGODB_NAME)
	const userRepository = new UserRepositoryMongo(mongoDbDriveAdpter)
	const contactsRepository = new ContactsRepositoryMongo(mongoDbDriveAdpter)
	const usecase = new AddContactUseCase(userRepository,contactsRepository)
	const controller = new WebController(new AddContactController(usecase))
	return controller
}