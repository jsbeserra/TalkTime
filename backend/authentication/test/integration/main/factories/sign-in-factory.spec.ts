import { makeSignInController } from "src/main/factories/sign-in-factory"

describe("sign-in-factory",()=>{
    test("Deve fabricar uma controler para ValidateTokenUseCase",()=>{
        expect(makeSignInController()).toBeTruthy()
    })
})