import { UseCase } from "src/aplication/use-case/use-case";
import { ControllerOperation, HttpRequest, HttpResponse } from "src/infra/http/ports";
import { badRequest, ok } from "../../infra/http/util";

export class ValidateTokenController implements ControllerOperation {
    readonly requiredParams: string[] = ['token'];
    private useCase: UseCase;

    constructor(useCase: UseCase) {
        this.useCase = useCase
    }

    async operation(request: HttpRequest): Promise<HttpResponse> {
        try {
            const result = await this.useCase.handle(request.body.token)
            return ok(result)
        } catch (err: any) {   
            return badRequest(err)
        }
    }

}