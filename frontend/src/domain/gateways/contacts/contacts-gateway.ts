import { Either } from '@shared/either'
import ResponseError from '@shared/response-error'
import Contact from '../../entities/contact'

export interface IContactsGateway {
    find(username: string, ownerUsername:string): Promise<Either<ResponseError, Contact[] | null>>
    add(username: string): Promise<Either<ResponseError, void>>
    invite(requester_username: string,targuet_username: string): Promise<Either<ResponseError, void>>
}