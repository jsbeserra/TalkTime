import { Router } from "express"
import { adaptRoute } from "src/infra/http/express/express-route-adapter"
import { makeFindUserByEmailController } from "../factories/find-user-by-email-factory"
import { makeFindUserByUsernameController } from "../factories/find-user-by-username-factory"

export default (router: Router): void => {
    router.get('/user-by-email', adaptRoute(makeFindUserByEmailController()))
    router.get('/user-by-username', adaptRoute(makeFindUserByUsernameController()))
}