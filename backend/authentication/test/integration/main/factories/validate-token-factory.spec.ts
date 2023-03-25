import { makeValidateTokenController } from "src/main/factories/validate-token-factory"

describe("validate-token-factory",()=>{
    test("Deve fabricar uma controler para ValidateTokenUseCase",()=>{
        expect(makeValidateTokenController()).toBeTruthy()
    })
})