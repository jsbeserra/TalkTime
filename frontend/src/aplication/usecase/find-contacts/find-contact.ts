import Contact from "../../../domain/entities/contact";
import { IContactsGateway } from "../../../domain/gateways/contacts/contacts-gateway";
import { Either, left, right } from "../../../shared/either";
import ResponseError from "../../../shared/response-error";
import { UseCase } from "../use-case";

export default class FindContacts implements UseCase{
    constructor(private contactsGateway:IContactsGateway){}

    async handle(username: string): Promise<Either<ResponseError, Contact[]>> {
        const contact = await this.contactsGateway.find(username)
        if(contact.isLeft()) return left(contact.value)
        if(contact.value) return right(contact.value);
        return right([])
    }
    
}