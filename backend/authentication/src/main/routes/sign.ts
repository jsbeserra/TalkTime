import { Router } from "express"
import { adaptRoute } from "../../infra/http/express/express-route-adapter"
import { makeSignInController } from "../factories/sign-in-factory"
import { makeSignUpController } from "../factories/sign-up-factory"

export default (router: Router): void => {
    router.post('/sign-in', adaptRoute(makeSignInController()))
    router.post('/sign-up', adaptRoute(makeSignUpController()))
}