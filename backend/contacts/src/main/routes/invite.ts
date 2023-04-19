import { Router } from "express"
import { adaptRoute } from "src/infra/http/express/express-route-adapter"
import { makeSendInviteToQueueController } from "../factories/send-invite-to-queue-factory"

export default (router: Router): void => {
    router.post('/invite', adaptRoute(makeSendInviteToQueueController()))
}