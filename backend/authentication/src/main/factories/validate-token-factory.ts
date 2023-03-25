import { JwtTokenManager } from "../../infra/adpters/token-manager-jsonweToken-adpter"
import { WebController } from "../../infra/http/web-controller"
import { environment } from "../config/config"
import { ValidateTokenController } from "../../presentation/controllers/validate-token"
import ValidateTokenUseCase from "../../aplication/use-case/validate-token/validate-token-use-case"

export const makeValidateTokenController = (): WebController => {
    const jwtTokenManager = new JwtTokenManager(environment.SECRETE)
    const usecase = new ValidateTokenUseCase(jwtTokenManager)
    const controller = new WebController(new ValidateTokenController(usecase))
    return controller
}