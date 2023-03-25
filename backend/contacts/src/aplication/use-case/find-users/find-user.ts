import { UserRepository } from "src/domain/repository/users/user-repository";
import { UseCase } from "../use-case";
import OutputFindUser from "./output-find-User";

export default class FindUsers implements UseCase {

    constructor(private usersRepository: UserRepository) { }

    async handle(identifier: string): Promise<OutputFindUser[] | undefined> {
        const users = await this.usersRepository.find(identifier);
        if (!users) return;
        let output: OutputFindUser[] = []
        for (const user of users) {
            output.push({
                email: user.email,
                id: user.id,
                name: user.name,
                username: user.username
            })
        }
        return output
    }
}