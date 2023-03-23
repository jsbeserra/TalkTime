import { MongoMemoryServer } from "mongodb-memory-server";
import { InputAddUser } from "src/aplication/use-case/sing-up/input-add-user";
import SingUpAddUseCase from "src/aplication/use-case/sing-up/sing-up-usecase";
import UserUpdateUsecase from "src/aplication/use-case/update-user/user-update-usecase";
import EncoderAdpterBcrypt from "src/infra/adpters/encoder-adpter-bcrypt";
import ConnectionMongoDb from "src/infra/connection/connectionMongoDb";
import UserRepositoryMongo from "src/infra/repository/user-repository-mongo";

describe('UserUpdateUsecase', () => {
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
        const fakeEmail = 'fakeEmailForUpdate@gmail.com'
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

    test('Deve atualizar o e-mail do usuário', async () => {
        const userUpdateUsecase = new UserUpdateUsecase(userRepository,encoderAdpterBcrypt)
        const fakeEmail = 'fakeEmailUpdated@gmail.com'
        const input = {
            email: fakeEmail,
            password: '12aSx#',
            username: 'fakeUsername',
            name: 'fakename'
        }
        const result = await userUpdateUsecase.handle(input)
        expect(result.email).toBe('fakeEmailUpdated@gmail.com')
    })
    
})