import moment from "moment-timezone";

export const Console = {
	DEFAULT_DATE_FORMAT: "YYYY-MM-DD HH:mm:ss",
	info: (...str: any[]) => {
		return console.info(`[INFO] ${moment().format(Console.DEFAULT_DATE_FORMAT)}`, ...str);
	},
	error: (...str: any[]) => {
		return console.error(`[ERROR] ${moment().format(Console.DEFAULT_DATE_FORMAT)}`, ...str);
	},
	log: (...str: any[]) => {
		return console.log(`[LOG] ${moment().format(Console.DEFAULT_DATE_FORMAT)}`, ...str);
	},
	warn: (...str: any[]) => {
		return console.warn(`[WARNNING] ${moment().format(Console.DEFAULT_DATE_FORMAT)}`, ...str);
	},
};
