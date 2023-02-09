import { Router } from "express"
import { adaptRoute } from "src/infra/http/express/express-route-adapter"
import { makeSignInController } from "../factories/sign-in-factory"

export default (router: Router): void => {
    router.get('/sign-up', adaptRoute(makeSignInController()))
}