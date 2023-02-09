import AuthenticationUseCase from "src/aplication/use-case/authentication/authentication"
import EncoderAdpterBcrypt from "src/infra/adpters/encoder-adpter-bcrypt"
import { JwtTokenManager } from "src/infra/adpters/token-manager-jsonweToken-adpter"
import ConnectionMongoDb from "src/infra/connection/connectionMongoDb"
import { WebController } from "src/infra/http/web-controller"
import UserRepositoryMongo from "src/infra/repository/user-repository-mongo"
import { environment } from "../config/config"
import { SignUpController } from "../../presentation/controllers/sign-up"
import SignInUseCase from "src/aplication/use-case/sing-ip/sign-in"

export const makeSignInController = (): WebController => {
    const mongoDbDriveAdpter: ConnectionMongoDb = new ConnectionMongoDb(environment.MONGODB_URI,environment.MONGODB_NAME)
    const userRepository = new UserRepositoryMongo(mongoDbDriveAdpter)
    const jwtTokenManager = new JwtTokenManager(environment.SECRETE)
    const encoderAdpterBcrypt = new EncoderAdpterBcrypt()
    const authenticationUseCase = new AuthenticationUseCase(userRepository,encoderAdpterBcrypt,jwtTokenManager)
    const usecase = new SignInUseCase(authenticationUseCase,userRepository)
    const controller = new WebController(new SignUpController(usecase))
    return controller
}