import ValidateTokenUseCase from "src/aplication/use-case/validate-token/validate-token-use-case"
import { JwtTokenManager } from "src/infra/adpters/token-manager-jsonweToken-adpter"
import { WebController } from "src/infra/http/web-controller"
import { ValidateTokenController } from "src/presentation/controllers/validate-token"

describe("ValidateTokenController", () => {
    const jwtTokenManager = new JwtTokenManager("fakesecrete")
    const useCase = new ValidateTokenUseCase(jwtTokenManager)
    const sut = new WebController(new ValidateTokenController(useCase))

    test("Deve validar um token e retonar statusCode 200", async () => {
        const token = await jwtTokenManager.sign({ id: "485069" }, "1d")
        const input = {
            body: {
                token: token,
            }
        }
        const result = await sut.handle(input)
        expect(result.statusCode).toBe(200)
    })

    test("Deve retonar erro se o token for invalido e o status code deve ser 400", async () => {
        const token = 'abc'
        const input = {
            body: {
                token: token,
            }
        }
        const result = await sut.handle(input)
        expect(result.statusCode).toBe(400)
    })
})