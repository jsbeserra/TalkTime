import Invite from "src/domain/entities/invite";
import { InviteRepository } from "../../domain/repository/users/invite-repository";
import ConnectionMongoDb from "../connection/connectionMongoDb";

export default class InviteRepositoryMongoDb implements InviteRepository{

    constructor(readonly connectionMongoDb: ConnectionMongoDb) { }

    public async save(invite:Invite):Promise<void>{
        const collection = await this.connectionMongoDb.getCollection('invites')
        await collection.insertOne({
            requester_username:invite.requester_username,
            targuet_username:invite.targuet_username,
            accepted:invite.accepted
        })  
    }
    
    public async accept(invite:Invite):Promise<void>{
        
    }
}