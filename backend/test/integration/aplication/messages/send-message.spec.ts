import MongoMemoryServer from "mongodb-memory-server-core";
import { describe, beforeAll, test,expect, afterAll, afterEach } from "vitest";
import SendMessage from "../../../../src/aplication/use-case/messages/send-message";
import UserAddUseCase from "../../../../src/aplication/use-case/user/add-user/user-add-usecase";
import Message from "../../../../src/domain/entities/message";
import { MessagesRepository } from "../../../../src/domain/repository/users/messages-repository";
import EncoderAdpterBcrypt from "../../../../src/infra/adpters/encoder-adpter-bcrypt";
import ConnectionMongoDb from "../../../../src/infra/connection/connectionMongoDb";
import MessagesRepositoryMongoDb from "../../../../src/infra/repository/messages-repository-mongo";
import UserRepositoryMongo from "../../../../src/infra/repository/user-repository-mongo";

describe('SendMessage', () => {
    let userRepository: UserRepositoryMongo
    let messagesRepository: MessagesRepository
    let connection: ConnectionMongoDb
    let mongod: MongoMemoryServer
    let encoderAdpterBcrypt:EncoderAdpterBcrypt
    let sut: SendMessage

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        connection = new ConnectionMongoDb(uri, 'chat_api')
        userRepository = new UserRepositoryMongo(connection)
        messagesRepository = new MessagesRepositoryMongoDb(connection)
        encoderAdpterBcrypt = new EncoderAdpterBcrypt()
        sut = new SendMessage(messagesRepository, userRepository)
        
    })

    afterEach(async()=>{
        await (await connection.getCollection('messages')).deleteMany()
        await (await connection.getCollection('users')).deleteMany()
    })

    afterAll(async()=>{ 
        await connection.disconnect()
        await mongod.stop()
    })

    test('Deve salvar uma mensagem', async () => {
        const userAdd = new UserAddUseCase(userRepository,encoderAdpterBcrypt)
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
        const result = await sut.exec({senderUsername:'fakeUser',recipientUsername:'sanoj',message:'Ola meu camarada',send_at:new Date()})
        expect(result).toBe(undefined)
    })

    test('Não deve enviar uma mensagem se o recipient não existir', async () => {
        const userAdd = new UserAddUseCase(userRepository,encoderAdpterBcrypt)
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
        expect(async()=> await sut.exec({senderUsername:'fakeUser',recipientUsername:'tonho',message:'Ola meu camarada',send_at:new Date()})).rejects.toThrow(new Error('Recipient user not found'))
    })

    test('Não deve enviar uma mensagem se o sender não existir', async () => {
        const userAdd = new UserAddUseCase(userRepository,encoderAdpterBcrypt)
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
        expect(async()=> await sut.exec({senderUsername:'ze',recipientUsername:'fakeUser',message:'Ola meu camarada',send_at:new Date()})).rejects.toThrow(new Error('Sender user not found'))
    })
})