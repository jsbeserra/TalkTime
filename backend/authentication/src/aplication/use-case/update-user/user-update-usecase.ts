import Email from "../../../domain/email";
import Encoder from "../../../domain/encoder";
import User from "../../../domain/entities/user";
import Name from "../../../domain/name";
import Password from "../../../domain/password";
import { UserRepository } from "../../../domain/repository/users/user-repository";
import Username from "../../../domain/username";
import { UseCase } from "../use-case";
import { InputUpdateUser } from "./input-user-update";
import { OutputUpdateUser } from "./output-user-update";

export default class UserUpdateUsecase implements UseCase {
    constructor(readonly userRepository: UserRepository, private encoder: Encoder) { }

    async handle(inputData: InputUpdateUser): Promise<OutputUpdateUser> {
        const exists = await this.userRepository.findByUserName(inputData.username)
        if (!exists) throw new Error('User not found')
        const updatedUser = new User(new Email(inputData.email ?? exists.email.value), new Password(inputData.password), new Name(exists.name.value), new Username(exists.username.value))
        const hashPassword = await this.encoder.encode(updatedUser.password.value)
        const user = await this.userRepository.update({
            email: updatedUser.email.value,
            password: hashPassword,
            name: updatedUser.name.value,
            username: updatedUser.username.value
        })
        return {
            email: user.email,
            name: user.name,
            username: user.username
        }
    }
}