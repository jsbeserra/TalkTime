import SocketIoAdpter from "src/infra/adpters/socketio-adpter";
import ExpressHttpServer from "../infra/http/express/ExpressHttpServer";
import { makeSendMessage } from "./factories/send-message-factory";

async function main() {
	const httpServer = new ExpressHttpServer();
	httpServer.listen(3003);
	const socketIoAdpter = new SocketIoAdpter(httpServer.app)
	const sendMessage = makeSendMessage(socketIoAdpter)
	socketIoAdpter.collect(sendMessage)
	console.log("Server started")
}

main();