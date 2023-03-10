import { faker } from '@faker-js/faker';
import User from '../../../../src/domain/entities/user';
import Email from '../../../../src/domain/email';
import Password from '../../../../src/domain/password';
import Name from '../../../../src/domain/name';
import Username from '../../../../src/domain/username';

describe("User", () => {
    test("Deve criar um usuário", () => {
        const fakeEmail = faker.internet.email()
        const fakePassword = '12aSx#'
        const user = new User(new Email(fakeEmail), new Password(fakePassword), new Name('teste'), new Username('testeUsername'))
        const userObject = user.getUser()
        expect(userObject).toMatchObject({
            name: "teste",
            username: "testeUsername",
            email: fakeEmail,
        })
    })
})