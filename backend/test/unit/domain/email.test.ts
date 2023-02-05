import {describe,test,expect} from 'vitest'
import { faker } from '@faker-js/faker';
import Email from '../../../src/domain/email';

describe("User",()=>{
    test("Deve criar um email valido", ()=>{
        const fakeEmail = faker.internet.email()
        const user = new Email(fakeEmail)
        expect(user.value).toBe(fakeEmail)
    })
    const invalidEmails = [
        "123@",
        "123@mail.com.",
        "@mail.com.",
        "fakemail.com."
    ]
    test.each(invalidEmails)("Deve dar erro de email invalido se o email for invalido: %s", (email)=>{
        expect(()=>new Email(email)).toThrow(new Error("invalid email"))
    })
})