import Account from "../../account";

export interface ISignGateway {
    singIn(email: string, password: string): Promise<Account>
    singUp(input:inputSingUp): Promise<void>
}

export interface inputSingUp {
    username: string,
    name: string,
    email: string,
    password: string,
}