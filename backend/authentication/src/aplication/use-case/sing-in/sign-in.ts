import { Authentication } from "../../../domain/authentication";
import { UserRepository } from "../../../domain/repository/users/user-repository";
import { UseCase } from "../use-case";
import { InputSignIn } from "./input-sign-in";
import { OutputSignIn } from "./output-sign-in";

export default class SignInUseCase implements UseCase {

    constructor(private authentication: Authentication, private userRepository: UserRepository) { }

    public async handle(input: InputSignIn): Promise<OutputSignIn> {
        const token = await this.authentication.auth({ email: input.email, password: input.password })
        const user = await this.userRepository.findByEmail(input.email)
        const output: OutputSignIn = {
            username: user.username.value,
            name: user.name.value,
            email: user.email.value,
            token: token.accessToken
        }
        return output
    }
}