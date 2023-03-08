import { ISignGateway } from "../../../domain/gateways/sing/sign-gateway";
import { InputSignIn } from "./input-sign-in";

export default class SignInUseCase {

    constructor(private signGateway: ISignGateway) { }

    async handle(input: InputSignIn): Promise<void> {
        const account = await this.signGateway.singIn(input.email, input.password)
        sessionStorage.setItem('jwt', account.jwt)
        sessionStorage.setItem('name', account.name)
        sessionStorage.setItem('username', account.username)
        sessionStorage.setItem('email', account.email)
    }
}