import MongoMemoryServer from "mongodb-memory-server-core";
import { describe, beforeAll, test, expect, afterAll, afterEach } from "vitest";
import GetMessages from "../../../../src/aplication/use-case/messages/get-messages";
import SendMessage from "../../../../src/aplication/use-case/messages/send-message";
import UserAddUseCase from "../../../../src/aplication/use-case/user/add-user/user-add-usecase";
import { MessagesRepository } from "../../../../src/domain/repository/users/messages-repository";
import EncoderAdpterBcrypt from "../../../../src/infra/adpters/encoder-adpter-bcrypt";
import ConnectionMongoDb from "../../../../src/infra/connection/connectionMongoDb";
import MessagesRepositoryMongoDb from "../../../../src/infra/repository/messages-repository-mongo";
import UserRepositoryMongo from "../../../../src/infra/repository/user-repository-mongo";

describe('GetMessages', () => {
    let userRepository: UserRepositoryMongo
    let messagesRepository: MessagesRepository
    let connection: ConnectionMongoDb
    let mongod: MongoMemoryServer
    let encoderAdpterBcrypt: EncoderAdpterBcrypt
    let sendMessage: SendMessage
    let sut: GetMessages

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        connection = new ConnectionMongoDb(uri, 'chat_api')
        userRepository = new UserRepositoryMongo(connection)
        messagesRepository = new MessagesRepositoryMongoDb(connection)
        encoderAdpterBcrypt = new EncoderAdpterBcrypt()
        sendMessage = new SendMessage(messagesRepository, userRepository)
        sut = new GetMessages(messagesRepository, userRepository)
        const userAdd = new UserAddUseCase(userRepository, encoderAdpterBcrypt)
        const userInputData1 = {
            email: 'fakeEmail@gmail.com',
            password: '12aSx#',
            username: 'sanoj',
            name: 'jonas'
        }
        const userInputData2 = {
            email: 'fakeEmail123@gmail.com',
            password: '18aSx#',
            username: 'fakeUser',
            name: 'fakeName'
        }
        await userAdd.handle(userInputData1)
        await userAdd.handle(userInputData2)  
    })

    afterEach(async () => {
        await (await connection.getCollection('messages')).deleteMany()
    })

    afterAll(async () => {
        await (await connection.getCollection('users')).deleteMany()
        await connection.disconnect()
        await mongod.stop()
    })

    test('Deve buscar mensagens', async () => {
        await sendMessage.exec({ senderUsername: 'fakeUser', recipientUsername: 'sanoj', message: 'Olá meu chapa', send_at: new Date() })
        await sendMessage.exec({ senderUsername: 'sanoj', recipientUsername: 'fakeUser', message: 'Olá meu camarada', send_at: new Date() })
        await sendMessage.exec({ senderUsername: 'sanoj', recipientUsername: 'fakeUser', message: 'Bom dia', send_at: new Date() })
        const result = await sut.exec({ recipientUsername: 'fakeUser', senderUsername: 'sanoj' })
        expect(result.length).toBe(3)
    })

    test('Não deve buscar uma mensagem se o recipient não existir', async () => {
        await sendMessage.exec({ senderUsername: 'fakeUser', recipientUsername: 'sanoj', message: 'Olá meu chapa', send_at: new Date() })
        expect(async()=>await sut.exec({ recipientUsername: 'bil', senderUsername: 'sanoj' })).rejects.toThrow(new Error('Recipient not found'))
    })

    test('Não deve buscar uma mensagem se o recipient não existir', async () => {
        await sendMessage.exec({ senderUsername: 'fakeUser', recipientUsername: 'sanoj', message: 'Olá meu chapa', send_at: new Date() })
        expect(async()=>await sut.exec({ recipientUsername: 'sanoj', senderUsername: 'fakeName' })).rejects.toThrow(new Error('Sender not found'))
    })
})