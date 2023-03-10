import http from "http";
import ExpressHttpServer from "../infra/http/express/ExpressHttpServer";
import 'dotenv/config';

async function main() {
	const httpServerExpress = new ExpressHttpServer();
	const httpServer = http.createServer(httpServerExpress.app)
	httpServer.listen(process.env.PORT,()=>{
		console.log("Server started")
	})	
}

main();