import User from "src/domain/entities/user";
import { UserRepository } from "src/domain/repository/users/user-repository";
import { UseCase } from "../use-case";

export default class FindUserByUsername implements UseCase {

    constructor(private usersRepository:UserRepository){}
    
    async handle(username: string): Promise<User | undefined> {
        const user = await this.usersRepository.findByUserName(username);
        if(user) return user
        throw new Error("User Not Found.");
    } 
}