import ConnectionMongoDb from "src/infra/connection/connectionMongoDb"
import UserRepositoryMongo from "src/infra/repository/user-repository-mongo"
import {MongoMemoryServer} from 'mongodb-memory-server'
import FindUsers from "src/aplication/use-case/find-users/find-user"
import ContactsRepositoryMongo from "src/infra/repository/contacts-repository-mongo"

describe('FindUsers',()=>{
    let userRepository: UserRepositoryMongo
    let connection: ConnectionMongoDb
    let mongod:MongoMemoryServer
    let contactsRepository:ContactsRepositoryMongo
    let sut:FindUsers
    
    beforeAll(async()=>{
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        connection = new ConnectionMongoDb(uri, 'chat_api')
        userRepository = new UserRepositoryMongo(connection)
        contactsRepository = new ContactsRepositoryMongo(connection)
        sut = new FindUsers(userRepository,contactsRepository)
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

        const input = {identifier: 'fakeUser', ownerUsername: 'fakeownerUsername'}
        const user = await sut.handle(input)
        expect(user.length).toBe(1)
    })
    
    test('Deve retornar um array vazio se nenhum usuário for encontrado',async ()=>{
        const input = {identifier: 'bill', ownerUsername: 'fakeownerUsername'}
        const user = await sut.handle(input)
        expect(user.length).toBe(0)
    })
})