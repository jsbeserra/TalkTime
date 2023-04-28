import Contact from '@domain/entities/contact'
import { IContactsGateway } from '@domain/gateways/contacts/contacts-gateway'
import { Either, left, right } from '@shared/either'
import ResponseError from '@shared/response-error'
import { UseCase } from '../use-case'
import InputFindContact from './input-find-contact'

export default class FindContacts implements UseCase{
	constructor(private contactsGateway:IContactsGateway){}

	async handle(input:InputFindContact): Promise<Either<ResponseError, Contact[]>> {
		const contact = await this.contactsGateway.find(input.identifier,input.ownerUsername)
		if (contact.isLeft()) return left(contact.value)
		if (contact.value) return right(contact.value)
		return right([])
	}
    
}