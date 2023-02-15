import HttpServer from "./HttpServer";
import express from "express";
import cors from "cors";
import setupRoutes from "src/main/config/setup-routes";

export default class ExpressHttpServer implements HttpServer {
	app: any;

	constructor () {
		this.app = express();
		this.app.use(express.json());
		this.app.use(cors());
		setupRoutes(this.app)
	}
	
	listen(port: number): void {
		return this.app.listen(port);
	}
}