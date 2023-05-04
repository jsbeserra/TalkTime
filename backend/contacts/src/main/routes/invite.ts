import { Router } from 'express'
import { adaptRoute } from 'src/infra/http/express/express-route-adapter'
import { makeSendInviteToQueueController } from '../factories/send-invite-to-queue-factory'
import { makeListInviteController } from '../factories/list-invites-factory'

export default (router: Router): void => {
	router.post('/invite', adaptRoute(makeSendInviteToQueueController()))
	router.get('/invites', adaptRoute(makeListInviteController()))
}