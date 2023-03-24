import { UseCase } from "../../aplication/use-case/use-case";
import { ControllerOperation, HttpRequest, HttpResponse } from "../../infra/http/ports";
import { unauthorized, ok } from "../../infra/http/util";

export class SignInController implements ControllerOperation {
    readonly requiredParams: string[] = ['email', 'password'];
    private useCase: UseCase;

    constructor(useCase: UseCase) {
        this.useCase = useCase
    }

    async operation(request: HttpRequest): Promise<HttpResponse> {
        try {
            const result = await this.useCase.handle(request.body)
            return ok(result)
        } catch (err: any) {
            return unauthorized(err)
        }
    }

}