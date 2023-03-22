import { Router } from "express"
import { adaptRoute } from "src/infra/http/express/express-route-adapter"
import { makeAddContactController } from "../factories/add-contact-factory"

export default (router: Router): void => {
    router.post('/addcontact', adaptRoute(makeAddContactController()))
}