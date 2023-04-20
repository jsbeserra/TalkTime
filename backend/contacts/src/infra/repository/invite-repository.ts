import Invite from "../../domain/entities/invite";
import { InviteRepository } from "../../domain/repository/users/invite-repository";
import ConnectionMongoDb from "../connection/connectionMongoDb";

export default class InviteRepositoryMongoDb implements InviteRepository{
    
    constructor(readonly connectionMongoDb: ConnectionMongoDb) { }

    async find(requester_username: string): Promise<Invite[]> {
        const collection = await this.connectionMongoDb.getCollection('invites')
        const invitesDocuments = await collection.find({requester_username:requester_username}).toArray()
        let invites:Invite[] = []
        for(const invite of invitesDocuments){
            invites.push(new Invite(invite.requester_username,invite.targuet_username,invite.accepted))
        }
        return invites
    }

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