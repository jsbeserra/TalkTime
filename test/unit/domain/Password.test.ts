import {describe,test,expect} from 'vitest'
import Password from '../../../src/domain/password';

describe("User",()=>{
    test("Deve criar uma senha com comprimento de no minimo 6 caracteres", ()=>{
        const fakePassword = "a2E4A@"
        const user = new Password(fakePassword)
        expect(6).toBe(user.value.length)
    })

    test("Deve lançar um erro se a senha tiver menos de 6 caracteres", ()=>{
        const fakePassword = "1234@"
        expect(()=>new Password(fakePassword)).toThrow(new Error('Invalid length, password must contain at least 6 characters'))
    })

    test("Deve lançar um erro se a senha não conter nenhum caractere especial", ()=>{
        const fakePassword = "as3456"
        expect(()=>new Password(fakePassword)).toThrow(new Error('Password must contain at least one special character'))
    })

    test("Deve lançar um erro se a senha não conter nenhuma letra maiuscula", ()=>{
        const fakePassword = "as3456@"
        expect(()=>new Password(fakePassword)).toThrow(new Error('Must contain a capital letter'))
    })

    test("Deve lançar um erro se a senha não conter nenhuma letra minuscula", ()=>{
        const fakePassword = "AX3456@"
        expect(()=>new Password(fakePassword)).toThrow(new Error('Must contain a lowercase letter'))
    })

    test("Deve lançar um erro se a senha não conter nenhum numero", ()=>{
        const fakePassword = "AXxxx@"
        expect(()=>new Password(fakePassword)).toThrow(new Error('Must contain numbers'))
    })
})
