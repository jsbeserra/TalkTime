import ConnectionMongoDb from 'src/infra/connection/connectionMongoDb'
import UserRepositoryMongo from 'src/infra/repository/user-repository-mongo'
import { environment } from '../config/config'
import SendInvite from 'src/aplication/use-case/send-invite/send-invite'
import InviteRepositoryMongoDb from 'src/infra/repository/invite-repository'


export const makeSendInviteUseCase = () => {
	const mongoDbDriveAdpter: ConnectionMongoDb = new ConnectionMongoDb(environment.MONGODB_URI,environment.MONGODB_NAME)
	const userRepository = new UserRepositoryMongo(mongoDbDriveAdpter)
	const inviteRepository = new InviteRepositoryMongoDb(mongoDbDriveAdpter)
	const usecase = new SendInvite(userRepository,inviteRepository)
	return usecase
}