import ConnectionMongoDb from "src/infra/connection/connectionMongoDb"
import UserRepositoryMongo from "src/infra/repository/user-repository-mongo"
import {MongoMemoryServer} from 'mongodb-memory-server'
import FindUsers from "src/aplication/use-case/find-users/find-user"

describe('FindUsers',()=>{
    let userRepository: UserRepositoryMongo
    let connection: ConnectionMongoDb
    let mongod:MongoMemoryServer

    beforeAll(async()=>{
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        connection = new ConnectionMongoDb(uri, 'chat_api')
        userRepository = new UserRepositoryMongo(connection)
    })

    afterEach(async () => {
        await (await connection.getCollection('users')).deleteMany()
    })

    afterAll(async () => {
        await (await connection.getCollection('users')).deleteMany()
        await connection.disconnect()
        await mongod.stop()
    })

    test('Deve buscar um usuário pelo email',async ()=>{
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

        const fakeUsername ='fakeUser'
        const findUser = new FindUsers(userRepository)
        const user = await findUser.handle(fakeUsername)
        expect(user.length).toBe(1)
    })
    
    test('Deve retornar um array vazio se nenhum usuário for encontrado',async ()=>{
        const fakeUsername ="bill"
        const findUser = new FindUsers(userRepository)
        const user = await findUser.handle(fakeUsername)
        expect(user.length).toBe(0)
    })
})