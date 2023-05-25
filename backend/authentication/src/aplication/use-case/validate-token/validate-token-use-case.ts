import { TokenManager } from "../../../domain/token-manager";
import { UseCase } from "../use-case";

export default class ValidateTokenUseCase implements UseCase {

    constructor(private tokenManager: TokenManager){}

    public async handle(token: string): Promise<void> {
        await this.tokenManager.verify(token)
    }
}