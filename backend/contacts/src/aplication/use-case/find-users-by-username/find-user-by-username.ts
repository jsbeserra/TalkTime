import { UserRepository } from "src/domain/repository/users/user-repository";
import { UseCase } from "../use-case";
import OutputFindUserByUsername from "./output-find-User-by-username";

export default class FindUserByUsername implements UseCase {

    constructor(private usersRepository:UserRepository){}
    
    async handle(username: string): Promise<OutputFindUserByUsername | undefined> {
        const user = await this.usersRepository.findByUserName(username);
        if(!user) throw new Error("User Not Found.");
        const output: OutputFindUserByUsername = {
            email: user.email,
            id: user.id,
            name: user.name,
            username: user.username
        }
        return output  
    } 
}