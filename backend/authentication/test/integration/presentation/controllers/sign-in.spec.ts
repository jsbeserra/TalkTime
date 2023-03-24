import { MongoMemoryServer } from "mongodb-memory-server"
import AuthenticationUseCase from "src/aplication/use-case/authentication/authentication"
import SignInUseCase from "src/aplication/use-case/sing-in/sign-in"
import { InputAddUser } from "src/aplication/use-case/sing-up/input-add-user"
import EncoderAdpterBcrypt from "src/infra/adpters/encoder-adpter-bcrypt"
import { JwtTokenManager } from "src/infra/adpters/token-manager-jsonweToken-adpter"
import ConnectionMongoDb from "src/infra/connection/connectionMongoDb"
import { WebController } from "src/infra/http/web-controller"
import UserRepositoryMongo from "src/infra/repository/user-repository-mongo"
import { SignInController } from "src/presentation/controllers/sign-in"

describe('SignInController', () => {
    let mongod: MongoMemoryServer
    let connection: ConnectionMongoDb
    let userRepository: UserRepositoryMongo
    let jwtTokenManager: JwtTokenManager
    let encoderAdpterBcrypt: EncoderAdpterBcrypt
    let authenticationUseCase: AuthenticationUseCase
    let usecase: SignInUseCase
    let sut: WebController

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        connection = new ConnectionMongoDb(uri, 'chat_api')
        userRepository = new UserRepositoryMongo(connection)
        encoderAdpterBcrypt = new EncoderAdpterBcrypt()
        jwtTokenManager = new JwtTokenManager('secrete')
        authenticationUseCase = new AuthenticationUseCase(userRepository, encoderAdpterBcrypt, jwtTokenManager)
        usecase = new SignInUseCase(authenticationUseCase, userRepository)
        sut = new WebController(new SignInController(usecase))
        const hashPassword = await encoderAdpterBcrypt.encode('12aSx#')
        const userInputData: InputAddUser = {
            email: 'fakeEmail@gmail.com',
            password: hashPassword,
            username: 'fakeUsername',
            name: 'fakename'
        }
        await userRepository.create(userInputData)
    })

    afterAll(async () => {
        connection.disconnect()
        const collection = await connection.getCollection('users')
        await collection.deleteMany({})
        await connection.disconnect()
        await mongod.stop()
    })

    test('Deve logar um usuário e retonar statusCode 200', async() => {
        const input = {
            body: {
                email: 'fakeEmail@gmail.com',
                password: '12aSx#',
            }
        }
        const result = await sut.handle(input)
        expect(result.statusCode).toBe(200)
    })
    test('Não deve logar um usuário se a senha ou email forem incorretos e retornar statusCode 401', async() => {
        const input = {
            body: {
                email: 'fakexEmail@gmail.com',
                password: 'a12aSx#',
            }
        }
        const result = await sut.handle(input)
        console.log(result)
        expect(result.statusCode).toBe(401)  
    })
})