import { Either, left, right } from '@shared/either'
import ResponseError from '@shared/response-error'
import { UseCase } from '../use-case'
import { IContactsGateway } from '@domain/gateways/contacts/contacts-gateway'
import Contact from '@domain/entities/contact'


export default class ListContacts implements UseCase{
    
	constructor(private contactsGateway:IContactsGateway){}

	async handle(username:string): Promise<Either<ResponseError, Contact[]>> {
		const result = await this.contactsGateway.listContacts(username)
		if (result.isLeft()) return left(result.value)
		return right(result.value)
	}
}