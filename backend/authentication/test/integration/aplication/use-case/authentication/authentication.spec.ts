import AuthenticationUseCase from "../../../../../src/aplication/use-case/authentication/authentication";
import { InputAddUser } from "../../../../../src/aplication/use-case/sing-up/input-add-user";
import SingUpAddUseCase from "../../../../../src/aplication/use-case/sing-up/sing-up-usecase";
import EncoderAdpterBcrypt from "../../../../../src/infra/adpters/encoder-adpter-bcrypt";
import { JwtTokenManager } from "../../../../../src/infra/adpters/token-manager-jsonweToken-adpter";
import ConnectionMongoDb from "../../../../../src/infra/connection/connectionMongoDb";
import UserRepositoryMongo from "../../../../../src/infra/repository/user-repository-mongo";
import {MongoMemoryServer} from 'mongodb-memory-server'

describe('AuthenticationUseCase', () => {
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

    test('Deve autenticar um usuário', async () => {
        const jwtTokenManager = new JwtTokenManager("secrete")
        const authenticationUseCase = new AuthenticationUseCase(userRepository,encoderAdpterBcrypt,jwtTokenManager)
        const input = {
            email: 'fakeEmail@gmail.com',
            password: '12aSx#',
        }
        const result = await authenticationUseCase.auth(input)
        expect(result).toBeTruthy()
    })

    test('Não deve autenticar o usuário se o email não existir', async () => {
        const jwtTokenManager = new JwtTokenManager("secrete")
        const authenticationUseCase = new AuthenticationUseCase(userRepository,encoderAdpterBcrypt,jwtTokenManager)
        const input = {
            email: 'fakeEmail123@gmail.com',
            password: '12aSx#',
        }
        expect(async ()=>await authenticationUseCase.auth(input)).rejects.toThrow(new Error('User not found'))
    })

    test('Não deve autenticar o usuário se a senha estiver errada', async () => {
        const jwtTokenManager = new JwtTokenManager("secrete")
        const authenticationUseCase = new AuthenticationUseCase(userRepository,encoderAdpterBcrypt,jwtTokenManager)
        const input = {
            email: 'fakeEmail@gmail.com',
            password: '00aAx#',
        }
        expect(async ()=>await authenticationUseCase.auth(input)).rejects.toThrow(new Error('Invalid email or password'))
    })
})