import { ISignGateway } from "../../../domain/gateways/sing/sign-gateway";
import { Either, left, right } from "../../../shared/either";
import ResponseError from "../../../shared/response-error";
import { InputSignIn } from "./input-sign-in";

export default class SignInUseCase {

    constructor(private signGateway: ISignGateway) { }

    async handle(input: InputSignIn): Promise<Either<ResponseError, void>> {
        const account = await this.signGateway.singIn(input.email, input.password)
        if(account.isLeft()) return left(account.value)
        sessionStorage.setItem('token', account.value.token)
        sessionStorage.setItem('name', account.value.name)
        sessionStorage.setItem('username', account.value.username)
        sessionStorage.setItem('email', account.value.email)
        return right(undefined);
    }
}