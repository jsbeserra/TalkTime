import { ISignGateway } from "../../../domain/gateways/sing/sign-gateway";
import { InputSignIn } from "./input-sign-in";

export default class SignInUseCase {

    constructor(private signGateway: ISignGateway) { }

    async handle(input: InputSignIn): Promise<void> {
        const account = await this.signGateway.singIn(input.email, input.password)
        if(account.isLeft()) return
        sessionStorage.setItem('jwt', account.value.jwt)
        sessionStorage.setItem('name', account.value.name)
        sessionStorage.setItem('username', account.value.username)
        sessionStorage.setItem('email', account.value.email)
    }
}