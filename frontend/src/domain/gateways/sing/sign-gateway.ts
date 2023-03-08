import Account from "../../account";

export interface ISignGateway {
    singIn(email: string, password: string): Promise<Account>
    singUp(input:inputSingUp): Promise<singUpOutPut>
}

export interface inputSingUp {
    username: string,
    name: string,
    email: string,
    password: string,
}

export interface singUpOutPut {
    data?:any,
    statuscode: number,
    message?:string
}