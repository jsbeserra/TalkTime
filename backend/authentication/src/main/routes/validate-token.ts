import { Router } from "express"
import { adaptRoute } from "../../infra/http/express/express-route-adapter"
import { makeValidateTokenController } from "../factories/validate-token-factory"

export default (router: Router): void => {
    router.post('/validatetoken', adaptRoute(makeValidateTokenController()))
}