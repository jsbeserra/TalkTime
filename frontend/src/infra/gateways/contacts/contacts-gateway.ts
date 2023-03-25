import Contact from "../../../domain/contact";
import { IContactsGateway } from "../../../domain/gateways/contacts/contacts-gateway";
import { Either, left, right } from "../../../shared/either";
import ResponseError from "../../../shared/response-error";
import HttpClient from "../../http/http-client";

export default class ContactsGateway implements IContactsGateway {
    constructor(readonly httpClient: HttpClient){}

    async find(identifier: string): Promise<Either<ResponseError, Contact[]>>{
        const result = await this.httpClient.get(`users?identifier=${identifier}`)
        if(result.isLeft()) return left(new ResponseError(result.value.message,result.value.statusCode))
        let users:Contact[] = []
        if(result.value){
            for(const user of result.value){
                users.push(new Contact(user.email,user.name,user.username,user.id))
            }
        }
        return right(users)
    }

    async add(username: string): Promise<Either<ResponseError, void>>{
        return right(undefined)
    }
}