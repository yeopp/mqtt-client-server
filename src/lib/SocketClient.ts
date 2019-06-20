import mqtt from "mqtt";
import uuid from "uuid/v4";
import processEnv from "../process_env";
import { Console } from "./utils";

const TCP_URL = `mqtt://${processEnv.MQTT_HOST}:${processEnv.MQTT_PORT}`;
const options = {
	connectTimeout: 4000,
	clientId: uuid(),
	keepalive: 60,
	clean: true,
};

const client = mqtt.connect(TCP_URL, options);
let clientStatus: "close" | "error" | "reconnect" | "end" | "connect" | "offline" = "close";

client.on("close", () => {
	clientStatus = "close";
	Console.log(`Socket Server Connect Status : ${clientStatus} - ${TCP_URL}`);
});

client.on("offline", () => {
	clientStatus = "offline";
	Console.log(`Socket Server Connect Status : ${clientStatus} - ${TCP_URL}`);
});
client.on("error", () => {
	clientStatus = "error";
	Console.log(`Socket Server Connect Status : ${clientStatus} - ${TCP_URL}`);
});
client.on("reconnect", () => {
	clientStatus = "reconnect";
	Console.log(`Socket Server Connect Status : ${clientStatus} - ${TCP_URL}`);
});
client.on("end", () => {
	clientStatus = "end";
	Console.log(`Socket Server Connect Status : ${clientStatus} - ${TCP_URL}`);
});
client.on("connect", () => {
	clientStatus = "connect";
	Console.log(`Socket Server Connect Status : ${clientStatus} - ${TCP_URL}`);
});

export { clientStatus };

export default client;
