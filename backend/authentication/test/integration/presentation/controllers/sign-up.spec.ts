import { MongoMemoryServer } from "mongodb-memory-server"
import AuthenticationUseCase from "src/aplication/use-case/authentication/authentication"
import SingUpAddUseCase from "src/aplication/use-case/sing-up/sing-up-usecase"
import EncoderAdpterBcrypt from "src/infra/adpters/encoder-adpter-bcrypt"
import { JwtTokenManager } from "src/infra/adpters/token-manager-jsonweToken-adpter"
import ConnectionMongoDb from "src/infra/connection/connectionMongoDb"
import { WebController } from "src/infra/http/web-controller"
import UserRepositoryMongo from "src/infra/repository/user-repository-mongo"
import { SignUpController } from "src/presentation/controllers/sign-up"

describe('SignUpController', () => {
    let mongod: MongoMemoryServer
    let connection: ConnectionMongoDb
    let userRepository: UserRepositoryMongo
    let jwtTokenManager: JwtTokenManager
    let encoderAdpterBcrypt: EncoderAdpterBcrypt
    let usecase: SingUpAddUseCase
    let sut: WebController

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        connection = new ConnectionMongoDb(uri, 'chat_api')
        userRepository = new UserRepositoryMongo(connection)
        encoderAdpterBcrypt = new EncoderAdpterBcrypt()
        jwtTokenManager = new JwtTokenManager('secrete')
        usecase = new SingUpAddUseCase(userRepository,encoderAdpterBcrypt)
        sut = new WebController(new SignUpController(usecase))
    })

    afterAll(async () => {
        connection.disconnect()
        const collection = await connection.getCollection('users')
        await collection.deleteMany({})
        await connection.disconnect()
        await mongod.stop()
    })

    afterEach(async()=>{
        const collection = await connection.getCollection('users')
        await collection.deleteMany({})
    })

    test('Deve cadrastrar um usuário e retonar statusCode 200', async() => {
        const input = {
            body: {
                name:'fakename',
                username:'fakeusername',
                email: 'fakeEmail@gmail.com',
                password: '12aSx#',
            }
        }
        const result = await sut.handle(input)
        expect(result.statusCode).toBe(201)
    })

    test('Deve falhar ao tentar criar um usuário sem name', async() => {
        const input = {
            body: {
                username:'fakeusername',
                email: 'fakeEmail@gmail.com',
                password: '12aSx#',
            }
        }
        const result = await sut.handle(input)
        expect(result.statusCode).toBe(400)
        expect(result.body).toBe('Missing parameter: name.')
        
    })

    test('Deve falhar ao tentar criar um usuário sem username', async() => {
        const input = {
            body: {
                name:'fakename',
                email: 'fakeEmail@gmail.com',
                password: '12aSx#',
            }
        }
        const result = await sut.handle(input)
        expect(result.statusCode).toBe(400)
        expect(result.body).toBe('Missing parameter: username.')
        
    })

    test('Deve falhar ao tentar criar um usuário sem email', async() => {
        const input = {
            body: {
                name:'fakename',
                username:'fakeusername',
                password: '12aSx#',
            }
        }
        const result = await sut.handle(input)
        expect(result.statusCode).toBe(400)
        expect(result.body).toBe('Missing parameter: email.')
        
    })

    test('Deve falhar ao tentar criar um usuário sem email', async() => {
        const input = {
            body: {
                name:'fakename',
                username:'fakeusername',
                email: 'fakeEmail@gmail.com',
            }
        }
        const result = await sut.handle(input)
        expect(result.statusCode).toBe(400)
        expect(result.body).toBe('Missing parameter: password.')
        
    })
})