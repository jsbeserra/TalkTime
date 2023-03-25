

import Email from "../../../domain/email";
import Encoder from "../../../domain/encoder";
import User from "../../../domain/entities/user";
import Name from "../../../domain/name";
import Password from "../../../domain/password";
import { UserRepository } from "../../../domain/repository/users/user-repository";
import Username from "../../../domain/username";
import { UseCase } from "../use-case";
import { InputAddUser } from "./input-add-user";

export default class SingUpAddUseCase implements UseCase{
    constructor(readonly userRepository: UserRepository, private encoder:Encoder) { }

    async handle(inputData: InputAddUser): Promise<void> {
        const existsUsername = await this.userRepository.findByUserName(inputData.username)
        const existsEmail = await this.userRepository.findByEmail(inputData.email)
        if (existsUsername) throw new Error('Informed username already exists')
        if (existsEmail) throw new Error('Informed email already exists')
        const user = new User(new Email(inputData.email), new Password(inputData.password), new Name(inputData.name), new Username(inputData.username))
        const hashPassword = await this.encoder.encode(user.password.value)
        await this.userRepository.create({
            email: user.email.value,
            password: hashPassword,
            name: user.name.value,
            username: user.username.value
        })
    }
}