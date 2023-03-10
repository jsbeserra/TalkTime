import { faker } from '@faker-js/faker';
import Name from '../../../src/domain/name';

describe("Name",()=>{
    test("Deve criar um nome valido", ()=>{
        const fakeName = faker.name.firstName()
        const name = new Name(fakeName)
        expect(name.value).toBe(fakeName)
    })

    test("Deve lançar um erro se o nome estiver vazio", ()=>{
        const fakeName = ""
        expect(() => new Name(fakeName)).toThrow(new Error('Name must contain at least 1 characters'))
    })

    test("Deve lançar um erro se o nome conter numeros ou caracteres especiais", ()=>{
        const fakeName = "jon@4s"
        expect(() => new Name(fakeName)).toThrow(new Error('Name must not contain numbers and special characters'))
    })
   
})