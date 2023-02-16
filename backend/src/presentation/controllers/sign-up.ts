import { UseCase } from "src/aplication/use-case/use-case";
import { ControllerOperation, HttpRequest, HttpResponse } from "src/infra/http/ports";
import { badRequest, ok } from "src/infra/http/util";

export class SignUpController implements ControllerOperation {
    readonly requiredParams: string[] = ['email', 'password', 'name','username'];
    private useCase: UseCase;

    constructor(useCase: UseCase) {
        this.useCase = useCase
    }

    async operation(request: HttpRequest): Promise<HttpResponse> {
        try {
            const result = await this.useCase.handle(request.body)
            return ok(result)
        } catch (err: any) {   
            return badRequest(err)
        }
    }

}