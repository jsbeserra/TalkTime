import { Authentication, AuthenticationParams, AuthenticationResult } from "../../../domain/authentication";
import Encoder from "../../../domain/encoder";
import { UserRepository } from "../../../domain/repository/users/user-repository";
import { TokenManager } from "../../../domain/token-manager";

export default class AuthenticationUseCase implements Authentication {
    constructor(private userRepository: UserRepository, private encoder: Encoder, private tokenManager: TokenManager) { }

    public async auth(authenticationParams: AuthenticationParams): Promise<AuthenticationResult> {
        const user = await this.userRepository.findByEmail(authenticationParams.email)
        if (!user) throw new Error('User not found')
        const passwordMatche = await this.encoder.compare(authenticationParams.password, user.password.value)
        if (!passwordMatche) throw new Error('Invalid email or password')
        const accessToken = await this.tokenManager.sign({ id: user.id! })
        return {
            accessToken: accessToken,
            id: user.id!
        }
    }
    
}