import EncoderAdpterBcrypt from "../../infra/adpters/encoder-adpter-bcrypt"
import ConnectionMongoDb from "../../infra/connection/connectionMongoDb"
import { WebController } from "../../infra/http/web-controller"
import UserRepositoryMongo from "../../infra/repository/user-repository-mongo"
import { environment } from "../config/config"
import { SignUpController } from "../../presentation/controllers/sign-up"
import SingUpAddUseCase from "../../aplication/use-case/sing-up/sing-up-usecase"

export const makeSignUpController = (): WebController => {
    const mongoDbDriveAdpter: ConnectionMongoDb = new ConnectionMongoDb(environment.MONGODB_URI,environment.MONGODB_NAME)
    const userRepository = new UserRepositoryMongo(mongoDbDriveAdpter)
    const encoderAdpterBcrypt = new EncoderAdpterBcrypt()
    const usecase = new SingUpAddUseCase(userRepository,encoderAdpterBcrypt)
    const controller = new WebController(new SignUpController(usecase))
    return controller
}