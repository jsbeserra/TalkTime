import Account from "../../../domain/account";
import { inputSingUp, ISignGateway } from "../../../domain/gateways/sing/sign-gateway";
import HttpClient from "../../http/http-client";

export default class SignGateway implements ISignGateway {

    constructor(readonly httpClient: HttpClient) { }

    async singIn(email: string, password: string): Promise<Account> {
        const result = await this.httpClient.post('/sign-in', { email, password })
        return new Account(result.username, result.name, result.email, result.jwt)
    }

    async singUp(input: inputSingUp): Promise<any> {
        const response = await this.httpClient.post('/sign-up', { input })
        console.log(response)
        return response
    }
}