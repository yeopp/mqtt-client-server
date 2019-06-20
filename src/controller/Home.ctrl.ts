import Router from "koa-router";
import SocketClient, { clientStatus } from "../lib/SocketClient";

const router: Router = new Router();

router.post("/push/service", async (ctx, next) => {
	const { topicNm, message } = ctx.request.body;

	if (clientStatus !== "connect") {
		ctx.status = 500;
		ctx.body = {
			clientStatus,
			message: "서버가 아직 메시지 브로커에 연결 되지 않았습니다.",
		};
	} else {
		SocketClient.publish(topicNm, JSON.stringify(message));
		ctx.body = {
			clientStatus,
			topic: topicNm,
			message: message,
		};
	}
});

export default router;
