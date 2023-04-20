import { UserRepository } from "src/domain/repository/users/user-repository";
import { UseCase } from "../use-case";
import OutputFindUser from "./output-find-User";
import { ContactsRepository } from "src/domain/repository/contacts-repository";
import { InputFindUsers } from "./input-find-users";
import { InviteRepository } from "src/domain/repository/users/invite-repository";
import Invite from "src/domain/entities/invite";

export default class FindUsers implements UseCase {

    constructor(private usersRepository: UserRepository, private contactsRepository: ContactsRepository, private inviteRepository: InviteRepository) { }

    async handle(input: InputFindUsers): Promise<OutputFindUser[] | undefined> {
        const users = await this.usersRepository.find(input.identifier);
        const contacts = await this.contactsRepository.find(input.ownerUsername)
        const ownerInvites = await this.inviteRepository.find(input.ownerUsername);
        let output: OutputFindUser[] = []
        for (const user of users) {
            const isAContact = contacts ? contacts.contacts.find(e => e === user.username) : false
            const hasInvite = ownerInvites.find(invite => invite.targuet_username === user.username)
            output.push({
                email: user.email,
                id: user.id,
                name: user.name,
                username: user.username,
                isAContact: isAContact ? true : false,
                invited: hasInvite ? true : null,
                invitePending: hasInvite ? !hasInvite.accepted : null
            })
        }
        return output
    }
}