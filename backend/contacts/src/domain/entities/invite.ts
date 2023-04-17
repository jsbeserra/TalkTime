export default class Invite {
    constructor(readonly requester_username: string, readonly targuet_username: string, readonly accepted: boolean = false) { }
}