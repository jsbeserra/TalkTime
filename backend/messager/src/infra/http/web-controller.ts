import { MissingParamError } from './errors'
import { ControllerOperation, HttpRequest, HttpResponse } from './ports'
import { badRequest, serverError } from './util'

export class WebController {
	private controllerOp: ControllerOperation

	constructor (controllerOp: ControllerOperation) {
		this.controllerOp = controllerOp
	}

	public async handle (request: HttpRequest): Promise<HttpResponse> {
		try {
			const missingParams: string = WebController.getMissingParams(request, this.controllerOp.requiredParams)
			if (missingParams) {
				return badRequest(new MissingParamError(missingParams))
			}
			return await this.controllerOp.operation(request)
		} catch (error) {
			return serverError(error)
		}
	}

	public static getMissingParams (request: HttpRequest, requiredParams: string[]): string {
		const missingParams: string[] = []
		requiredParams.forEach(function (name) {
			if (!Object.keys(request.body).includes(name)) {
				missingParams.push(name)
			}
		})
		return missingParams.join(', ')
	}
}
