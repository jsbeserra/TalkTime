import { MongoMemoryServer } from "mongodb-memory-server"
import FindUserByUsername from "src/aplication/use-case/find-users-by-username/find-user-by-username"
import ConnectionMongoDb from "src/infra/connection/connectionMongoDb"
import { HttpRequest } from "src/infra/http/ports"
import { WebController } from "src/infra/http/web-controller"
import UserRepositoryMongo from "src/infra/repository/user-repository-mongo"
import { FindUserByUsernameController } from "src/presentation/controllers/find-user-by-username"

describe('FindUserByUsernameController', () => {
    let userRepository: UserRepositoryMongo
    let connection: ConnectionMongoDb
    let mongod: MongoMemoryServer
    let sut: WebController
    beforeAll(async () => {
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        connection = new ConnectionMongoDb(uri, 'chat_api')
        userRepository = new UserRepositoryMongo(connection)
        const usecase = new FindUserByUsername(userRepository)
        sut = new WebController(new FindUserByUsernameController(usecase))
    })

    afterEach(async () => {
        await (await connection.getCollection('users')).deleteMany()
    })

    test('Deve buscar um usuário encontrar e retornar codigo 200', async () => {
        const userInputData1 = {
            email: 'fakeEmail@gmail.com',
            password: '18aSx#',
            username: 'fakeUser',
            name: 'fakeName'
        }
        const collection = await connection.getCollection('users')
        await collection.insertMany([
            userInputData1
        ])
        const input: HttpRequest = { query: { username: 'fakeUser' } }
        const result = await sut.handle(input)
        expect(result.statusCode).toBe(200)
        expect(result.body).toMatchObject(
            {
                email: 'fakeEmail@gmail.com',
                name: 'fakeName',
                username: 'fakeUser'
            }
        )
    })

    test('Deve buscar um usuário não encontrar e retornar codigo 400', async () => {
        const input: HttpRequest = { query: { username: 'fakeUser' } }
        const result = await sut.handle(input)
        expect(result.statusCode).toBe(400)
        expect(result.body).toBe('User Not Found.')
    })
})