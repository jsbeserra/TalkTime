import { InviteRepository } from "src/domain/repository/users/invite-repository";
import { UseCase } from "../use-case";
import { outputListInvites } from "./output-list-invites";

export default class ListInvites implements UseCase {
  constructor(private inviteRepository: InviteRepository) {}

  async handle(username: string): Promise<outputListInvites[]> {
    const invites = await this.inviteRepository.list(username);
    const output: outputListInvites[] = [];
    for (const invite of invites) {
      output.push({
        requester_username: invite.requester_username,
        targuet_username: invite.targuet_username,
      });
    }
    return output;
  }
}
