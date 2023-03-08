import { inputSingUp, ISignGateway } from "../../../domain/gateways/sing/sign-gateway";

export default class SingUpUseCase {
    constructor(private signGateway:ISignGateway){}

    public async handle(input:inputSingUp){
        const result = await this.signGateway.singUp(input)
        if(result.statuscode === 201) return
        throw new Error(result.message)
    }
}