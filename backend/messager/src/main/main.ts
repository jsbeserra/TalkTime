import http from "http";
import SocketIoAdpter from "src/infra/adpters/socketio-adpter";
import ExpressHttpServer from "../infra/http/express/ExpressHttpServer";
import { makeSendMessage } from "./factories/send-message-factory";
import 'dotenv/config';

async function main() {
	const httpServerExpress = new ExpressHttpServer();
	const httpServer = http.createServer(httpServerExpress.app)
	const socketIoAdpter = new SocketIoAdpter(httpServer)
	const sendMessage = makeSendMessage(socketIoAdpter)
	socketIoAdpter.collect(sendMessage)
	httpServer.listen(process.env.PORT,()=>{
		console.log("Server started")
	})	
}

main();