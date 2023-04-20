import Invite from "src/domain/entities/invite"

export interface InviteRepository {
    save(invite:Invite):Promise<void>
    accept(invite:Invite):Promise<void>
    find(requester_username:string):Promise<Invite[]>
}