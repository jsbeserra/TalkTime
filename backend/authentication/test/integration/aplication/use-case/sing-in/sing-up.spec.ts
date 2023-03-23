import AuthenticationUseCase from "src/aplication/use-case/authentication/authentication";
import { InputAddUser } from "src/aplication/use-case/sing-up/input-add-user";
import SingUpAddUseCase from "src/aplication/use-case/sing-up/sing-up-usecase";
import EncoderAdpterBcrypt from "src/infra/adpters/encoder-adpter-bcrypt";
import { JwtTokenManager } from "src/infra/adpters/token-manager-jsonweToken-adpter";
import ConnectionMongoDb from "src/infra/connection/connectionMongoDb";
import UserRepositoryMongo from "src/infra/repository/user-repository-mongo";
import {MongoMemoryServer} from 'mongodb-memory-server'
import SignInUseCase from "src/aplication/use-case/sing-in/sign-in";



describe('SignInUseCase', () => {
    let userRepository: UserRepositoryMongo
    let connection: ConnectionMongoDb
    let encoderAdpterBcrypt:EncoderAdpterBcrypt
    let mongod:MongoMemoryServer

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        connection = new ConnectionMongoDb(uri, 'chat_api')
        userRepository = new UserRepositoryMongo(connection)
        encoderAdpterBcrypt = new EncoderAdpterBcrypt()
        const userAdd = new SingUpAddUseCase(userRepository,encoderAdpterBcrypt)
        const fakeEmail = 'fakeEmail@gmail.com'
        const userInputData: InputAddUser = {
            email: fakeEmail,
            password: '12aSx#',
            username: 'fakeUsername',
            name: 'fakename'
        }
        await userAdd.handle(userInputData)
    })

    afterAll(async () => {
        const collection = await connection.getCollection('users')
        await collection.deleteMany({})
        await connection.disconnect()
        await mongod.stop()
    })

    test('Deve logar um usuário', async () => {
        const jwtTokenManager = new JwtTokenManager("secrete")
        const authenticationUseCase = new AuthenticationUseCase(userRepository,encoderAdpterBcrypt,jwtTokenManager)
        const signInUseCase = new SignInUseCase(authenticationUseCase,userRepository)
        const input = {
            email: 'fakeEmail@gmail.com',
            password: '12aSx#',
        }
        const result = await signInUseCase.handle(input)
        expect(result).toMatchObject({
            email: 'fakeEmail@gmail.com',
            username: 'fakeUsername',
            name: 'fakename'
        })
    })
})