import ExpressHttpServer from "../infra/http/express/ExpressHttpServer";

async function main() {
	const httpServer = new ExpressHttpServer();
	httpServer.listen(3003);
	console.log("Server started")
}

main();