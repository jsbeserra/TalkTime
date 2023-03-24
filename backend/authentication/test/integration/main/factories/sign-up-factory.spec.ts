import { makeSignUpController } from "src/main/factories/sign-up-factory"

describe("sign-up-factory",()=>{
    test("Deve fabricar uma controler para SignUpController",()=>{
        expect(makeSignUpController()).toBeTruthy()
    })
})