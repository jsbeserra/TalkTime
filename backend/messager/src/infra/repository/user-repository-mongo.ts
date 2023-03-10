import Email from "../../domain/email";
import User from "../../domain/entities/user";
import Name from "../../domain/name";
import Password from "../../domain/password";
import { UserRepository } from "../../domain/repository/users/user-repository";
import Username from "../../domain/username";
import ConnectionMongoDb from "../connection/connectionMongoDb";

export default class UserRepositoryMongo implements UserRepository {

    constructor(readonly connectionMongoDb: ConnectionMongoDb) { }

    async findByUserName(username: string): Promise<User | undefined> {
        const collection = await this.connectionMongoDb.getCollection('users')
        const result = await collection.findOne({
            username: username
        })
        if (!result) return 
        const user = new User(new Email(result.email), new Password(result.password), new Name(result.name), new Username(result.username),result._id.toString())
        return user
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const collection = await this.connectionMongoDb.getCollection('users')
        const result = await collection.findOne({
            email: email
        })
        if (!result) return
        const user = new User(new Email(result.email), new Password(result.password), new Name(result.name), new Username(result.username),result._id.toString())
        return user
    }

}