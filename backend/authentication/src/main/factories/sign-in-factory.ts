import AuthenticationUseCase from "../../aplication/use-case/authentication/authentication"
import EncoderAdpterBcrypt from "../../infra/adpters/encoder-adpter-bcrypt"
import { JwtTokenManager } from "../../infra/adpters/token-manager-jsonweToken-adpter"
import ConnectionMongoDb from "../../infra/connection/connectionMongoDb"
import { WebController } from "../../infra/http/web-controller"
import UserRepositoryMongo from "../../infra/repository/user-repository-mongo"
import { environment } from "../config/config"
import SignInUseCase from "../../aplication/use-case/sing-in/sign-in"
import { SignInController } from "../../presentation/controllers/sign-in"

export const makeSignInController = (): WebController => {
    const mongoDbDriveAdpter: ConnectionMongoDb = new ConnectionMongoDb(environment.MONGODB_URI,environment.MONGODB_NAME)
    const userRepository = new UserRepositoryMongo(mongoDbDriveAdpter)
    const jwtTokenManager = new JwtTokenManager(environment.SECRETE)
    const encoderAdpterBcrypt = new EncoderAdpterBcrypt()
    const authenticationUseCase = new AuthenticationUseCase(userRepository,encoderAdpterBcrypt,jwtTokenManager)
    const usecase = new SignInUseCase(authenticationUseCase,userRepository)
    const controller = new WebController(new SignInController(usecase))
    return controller
}