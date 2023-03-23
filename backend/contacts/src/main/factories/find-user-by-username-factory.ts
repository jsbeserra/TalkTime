import ConnectionMongoDb from "src/infra/connection/connectionMongoDb"
import { WebController } from "src/infra/http/web-controller"
import UserRepositoryMongo from "src/infra/repository/user-repository-mongo"
import { environment } from "../config/config"
import { FindUserByUsernameController } from "src/presentation/controllers/find-user-by-username"
import FindUserByUsername from "src/aplication/use-case/find-users-by-username/find-user-by-username"

export const makeFindUserByUsernameController = (): WebController => {
    const mongoDbDriveAdpter: ConnectionMongoDb = new ConnectionMongoDb(environment.MONGODB_URI,environment.MONGODB_NAME)
    const userRepository = new UserRepositoryMongo(mongoDbDriveAdpter)
    const usecase = new FindUserByUsername(userRepository)
    const controller = new WebController(new FindUserByUsernameController(usecase))
    return controller
}