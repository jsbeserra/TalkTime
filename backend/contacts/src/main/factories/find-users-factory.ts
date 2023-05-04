import ConnectionMongoDb from 'src/infra/connection/connectionMongoDb'
import { WebController } from 'src/infra/http/web-controller'
import UserRepositoryMongo from 'src/infra/repository/user-repository-mongo'
import { environment } from '../config/config'
import { FindUsersController } from 'src/presentation/controllers/find-users'
import FindUsers from 'src/aplication/use-case/find-users/find-user'
import ContactsRepositoryMongo from 'src/infra/repository/contacts-repository-mongo'
import InviteRepositoryMongoDb from 'src/infra/repository/invite-repository'


export const makeFindUserController = (): WebController => {
	const mongoDbDriveAdpter: ConnectionMongoDb = new ConnectionMongoDb(environment.MONGODB_URI,environment.MONGODB_NAME)
	const userRepository = new UserRepositoryMongo(mongoDbDriveAdpter)
	const contactsRepository = new ContactsRepositoryMongo(mongoDbDriveAdpter)
	const inviteRepository = new InviteRepositoryMongoDb(mongoDbDriveAdpter)
	const usecase = new FindUsers(userRepository,contactsRepository,inviteRepository)
	const controller = new WebController(new FindUsersController(usecase))
	return controller
}