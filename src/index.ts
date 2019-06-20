import path from "path";
require("dotenv").config({
	path: path.join(__dirname, "..", ".env"),
});
import processEnv from "./process_env";
import Koa from "koa";
import cors from "@koa/cors";
import bodyparser from "koa-bodyparser";
import logger from "koa-logger";
import session from "koa-session";
import mongoDB from "./lib/mongodbConnector";
import { HomeCtrl } from "./controller";
import client from "./lib/SocketClient";
import { update } from "./service/locationService";
import moment from "moment-timezone";
import { Console } from "./lib/utils";

moment.tz.setDefault("Asia/Seoul");

const Application = async () => {
	try {
		Console.info("MongoDB Connection Try...");
		await mongoDB.start();
		Console.info("MongoDB Connection SUCCESS");
	} catch (e) {
		Console.error("MongoDB Connected Failed", e);
	}

	try {
		Console.info("Web Application Initialize Try...");
		const app = new Koa();
		const PORT = processEnv.APPLICATION_PORT;

		const SESSION_CONFIG: Partial<session.opts> = {
			key: "server:sess",
			maxAge: 86400000,
			overwrite: true,
			httpOnly: true,
			signed: true,
			rolling: false,
			renew: false,
		};

		app.use(session(SESSION_CONFIG, app));
		app.use(logger());
		app.use(bodyparser());
		app.use(HomeCtrl.routes());
		app.use(cors());

		app.listen(PORT, () => {
			Console.log(`Server Running At PORT ${PORT} - Mode ${process.env.NODE_ENV || "development"}`);
		});
	} catch (e) {
		Console.error("Web Application Initialize Failed", e);
	}

	client.on("connect", () => {
		client.subscribe("driver/+/location", err => {
			Console.log(err || "location Subscribe Success");
		});

		client.subscribe("driver/+/waiting", err => {
			Console.log(err || "waiting Subscribe Success");
		});
	});

	client.on("message", (topic, message) => {
		update(topic, message);
	});
};

Application();
