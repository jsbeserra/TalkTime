import Message from '../../domain/entities/message'
import { MessagesRepository } from '../../domain/repository/users/messages-repository'
import ConnectionMongoDb from '../connection/connectionMongoDb'

export default class MessagesRepositoryMongoDb implements MessagesRepository {

	constructor(readonly connectionMongoDb: ConnectionMongoDb) { }
    
	async save(message:Message): Promise<void>{
		const collection = await this.connectionMongoDb.getCollection('messages')
		await collection.insertOne({
			senderId:message.senderId,
			recipientId:message.recipientId,
			message:message.message,
			send_at: new Date()
		})
	}

	async getMessages(senderId: string, recipientId: string): Promise<Message[]>{
		const collection = await this.connectionMongoDb.getCollection('messages')
		const messagesSender = await collection.find({
			senderId:senderId,
			recipientId:recipientId,
		}).sort({send_at:1}).toArray()
		const messagesRecipient = await collection.find({
			senderId:recipientId,
			recipientId:senderId,
		}).sort({send_at:1}).toArray()
		const messages = [...messagesSender,...messagesRecipient]
		messages.sort(function (a, b) {
			return a.send_at < b.send_at ? -1 : a.send_at > b.send_at ? 1 : 0
		})
		const messagesArray:Message[] = []
		for (const message of messages){
			messagesArray.push(new Message(message.senderId,message.recipientId,message.message,message.send_at))
		}
		return messagesArray
	}
}