import ConnectionMongoDb from 'src/infra/connection/connectionMongoDb'
import { WebController } from 'src/infra/http/web-controller'
import UserRepositoryMongo from 'src/infra/repository/user-repository-mongo'
import { environment } from '../config/config'
import { FindUserByEmailController } from 'src/presentation/controllers/find-user-by-email'
import FindUserByEmail from 'src/aplication/use-case/find-users-by-email/find-user-by-email'

export const makeFindUserByEmailController = (): WebController => {
	const mongoDbDriveAdpter: ConnectionMongoDb = new ConnectionMongoDb(environment.MONGODB_URI,environment.MONGODB_NAME)
	const userRepository = new UserRepositoryMongo(mongoDbDriveAdpter)
	const usecase = new FindUserByEmail(userRepository)
	const controller = new WebController(new FindUserByEmailController(usecase))
	return controller
}