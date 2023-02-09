import HttpServer from "./HttpServer";
import express from "express";
import cors from "cors";

export default class ExpressHttpServer implements HttpServer {
	app: any;

	constructor () {
		this.app = express();
		this.app.use(express.json());
		this.app.use(cors());
	}
	
	listen(port: number): void {
		return this.app.listen(port);
	}
}