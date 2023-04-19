import { UserRepository } from "src/domain/repository/users/user-repository";
import { UseCase } from "../use-case";
import OutputFindUser from "./output-find-User";
import { ContactsRepository } from "src/domain/repository/contacts-repository";
import { InputFindUsers } from "./input-find-users";

export default class FindUsers implements UseCase {

    constructor(private usersRepository: UserRepository, private contactsRepository: ContactsRepository) { }

    async handle(input:InputFindUsers): Promise<OutputFindUser[] | undefined> {
        const users = await this.usersRepository.find(input.identifier);
        const contacts = await this.contactsRepository.find(input.ownerUsername)
        if (!users) return;
        let output: OutputFindUser[] = []
        for (const user of users) {
            const isAContact = contacts ? contacts.contacts?.find(e=> e === user.username):false
            output.push({
                email: user.email,
                id: user.id,
                name: user.name,
                username: user.username,
                isAContact: isAContact ? true:false
            })
        }
        return output
    }
}