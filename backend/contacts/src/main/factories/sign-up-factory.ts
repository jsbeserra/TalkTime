import EncoderAdpterBcrypt from "src/infra/adpters/encoder-adpter-bcrypt"
import ConnectionMongoDb from "src/infra/connection/connectionMongoDb"
import { WebController } from "src/infra/http/web-controller"
import UserRepositoryMongo from "src/infra/repository/user-repository-mongo"
import { environment } from "../config/config"
import { SignUpController } from "../../presentation/controllers/sign-up"
import UserAddUseCase from "src/aplication/use-case/user/add-user/user-add-usecase"

export const makeSignUpController = (): WebController => {
    const mongoDbDriveAdpter: ConnectionMongoDb = new ConnectionMongoDb(environment.MONGODB_URI,environment.MONGODB_NAME)
    const userRepository = new UserRepositoryMongo(mongoDbDriveAdpter)
    const encoderAdpterBcrypt = new EncoderAdpterBcrypt()
    const usecase = new UserAddUseCase(userRepository,encoderAdpterBcrypt)
    const controller = new WebController(new SignUpController(usecase))
    return controller
}