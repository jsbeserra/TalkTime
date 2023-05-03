import { IContactsGateway } from '@domain/gateways/contacts/contacts-gateway'
import Contact from '@domain/entities/contact'
import { Either, left, right } from '@shared/either'
import ResponseError from '@shared/response-error'
import HttpClient from '../../http/http-client'

export default class ContactsGateway implements IContactsGateway {
	constructor(readonly httpClient: HttpClient){}


	async find(identifier: string,ownerUsername:string): Promise<Either<ResponseError, Contact[]>>{
		const result = await this.httpClient.get(`users?identifier=${identifier}&ownerUsername=${ownerUsername}`)
		if (result.isLeft()) return left(new ResponseError(result.value.message,result.value.statusCode))
		const users:Contact[] = []
		if (result.value){
			for (const user of result.value){
				console.log(user)
				users.push(new Contact(user.email,user.name,user.username,user.id,user.isAContact,user.invited,user.invitePending))
			}
		}
		return right(users)
	}

	async add(username: string): Promise<Either<ResponseError, void>>{
		return right(undefined)
	}

	async invite(requester_username: string, targuet_username: string): Promise<Either<ResponseError, any>> {
		return await this.httpClient.post('invite',{requester_username,targuet_username})
	}
}