
import {describe,test,expect,beforeAll,afterEach} from 'vitest'
import { faker } from '@faker-js/faker';
import UserRepositoryMongo from '../../../../../src/infra/repository/user-repository-mongo';
import { InputAddUser } from '../../../../../src/aplication/use-case/user/add-user/input-add-user';
import ConnectionMongoDb from '../../../../../src/infra/connection/connectionMongoDb';
import UserAddUseCase from '../../../../../src/aplication/use-case/user/add-user/user-add-usecase';
import EncoderAdpterBcrypt from '../../../../../src/infra/adpters/encoder-adpter-bcrypt';


describe('UserAddUseCase', () => {
    let userRepository: UserRepositoryMongo
    let connection: ConnectionMongoDb
    let encoderAdpterBcrypt: EncoderAdpterBcrypt
    beforeAll(async () => {
        encoderAdpterBcrypt = new EncoderAdpterBcrypt()
        connection = new ConnectionMongoDb('mongodb://admin:admin@localhost:27017', 'chat_api')
        userRepository = new UserRepositoryMongo(connection)
    })

    afterEach(async () => {
        const collection = await connection.getCollection('users')
        await collection.deleteMany({})
        await connection.disconnect()
    })

    test('Deve criar um usuário', async () => {
        const userAdd = new UserAddUseCase(userRepository,encoderAdpterBcrypt)
        const fakeEmail = faker.internet.email()
        const fakeUsername = faker.internet.userName()
        const userInputData: InputAddUser = {
            email: fakeEmail,
            password: '12aSx#',
            username: fakeUsername,
            name: 'jonas'
        }
        const result = await userAdd.handle(userInputData)
        expect(result).toBe(undefined)
    })

    test('Deve lançar um erro se o username já existir', async () => {
        const userAdd = new UserAddUseCase(userRepository,encoderAdpterBcrypt)
        const userInputData: InputAddUser = {
            email: 'fakeunico@Email.com',
            password: '12aSx#',
            name: 'fakeName',
            username: 'fakeUsername',
        }
        await userAdd.handle(userInputData)
        expect(async ()=> await userAdd.handle(userInputData)).rejects.toThrow(new Error('Informed username already exists'))
    })

    test('Deve lançar um erro se o email já existir', async ()=>{
        const userAdd = new UserAddUseCase(userRepository,encoderAdpterBcrypt)
        const userInputData:InputAddUser = {
            email:'fake2@gmail.com',
            password:'12aSx#',
            name:'fakeNameA',
            username:'fakeusernameA',
        }
        const userInputDataOldFake:InputAddUser = {
            email:'fake2@gmail.com',
            password:'12aSx#',
            name:'fakeNameB',
            username:'fakeUsernameZ',
        }
        await userAdd.handle(userInputDataOldFake)
        expect(async ()=> await userAdd.handle(userInputData)).rejects.toThrow(new Error('Informed email already exists'))
    })
})