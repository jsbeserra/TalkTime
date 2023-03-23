import ValidateTokenUseCase from "../../../../../src/aplication/use-case/validate_token/validate-token-use-case"
import { JwtTokenManager } from "../../../../../src/infra/adpters/token-manager-jsonweToken-adpter"

describe("ValidateTokenUseCase", () => {
    const jwtTokenManager = new JwtTokenManager("fakesecrete")
    const sut = new ValidateTokenUseCase(jwtTokenManager)

    test("Deve validar um token", async () => {
        const token = await jwtTokenManager.sign({id: "485000"},"1d")
        const isvalidToken = await sut.handle(token)
        expect(isvalidToken).toBeUndefined()
    })
    test("Deve validar um token com tempo default de expiração", async () => {
        const token = await jwtTokenManager.sign({id: "485000"})
        const isvalidToken = await sut.handle(token)
        expect(isvalidToken).toBeUndefined()
    })

    test("Deve lançar uma exception se o token for invalido", async () => {
        const token = "abc"
        expect(async()=>await sut.handle(token)).rejects.toThrow(new Error('Failed to verify token'))
    })
})