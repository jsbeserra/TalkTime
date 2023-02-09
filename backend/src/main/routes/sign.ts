import { Router } from "express"
import { adaptRoute } from "src/infra/http/express/express-route-adapter"
import { makeSignInController } from "../factories/sign-in-factory"
import { makeSignUpController } from "../factories/sign-up-factory"

export default (router: Router): void => {
    router.get('/sign-ip', adaptRoute(makeSignInController()))
    router.get('/sign-up', adaptRoute(makeSignUpController()))
}