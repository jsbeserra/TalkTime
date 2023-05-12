import { MessagesRepository } from '../../../../domain/repository/users/messages-repository'
import { UserRepository } from '../../../../domain/repository/users/user-repository'
import InputGetMessages from './input-get-messages'
import OutputGetMessages from '../send-message/output-get-messages'

export default class GetMessages {
	constructor(private messagesRepository:MessagesRepository,private userRepository: UserRepository){}

	public async exec(input:InputGetMessages):Promise<OutputGetMessages[]>{
		const sender = await this.userRepository.findByUserName(input.senderUsername)
		if (!sender) throw new Error('Sender not found')
		const recipient = await this.userRepository.findByUserName(input.recipientUsername)
		if (!recipient) throw new Error('Recipient not found')
		const messages = await this.messagesRepository.getMessages(input.senderUsername,input.recipientUsername)
		const outputGetMessages:OutputGetMessages[] = []
		for (const message of messages){
			outputGetMessages.push({
				message:message.message,
				recipientUsername:recipient.username.value,
				senderUsername:sender.username.value,
				send_at:message.send_at
			})
		}
		return outputGetMessages
	}
}