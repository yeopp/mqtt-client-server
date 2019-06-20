import { DriverConnectModel, DriverLocationLogModel } from "./../model/type";
import { Console } from "../lib/utils";
import { ITopicMessageObject, ITopicLocation } from "../@types";

export const update = async (topic: string, message: Object) => {
	let messageObject: ITopicMessageObject = JSON.parse(message.toString());
	Console.info(`Topic: `, topic);

	try {
		if (topic.endsWith("waiting")) {
			if (Number(message) !== NaN) {
				// 대기열삭제
				Console.info("Delete waiting queue");
				try {
					await DriverConnectModel.deleteOne({ driverId: Number(message) });
				} catch (err) {
					Console.error(err);
				}
			} else {
				let locationLog = messageObject.locations;

				await DriverConnectModel.findOneAndUpdate(
					{ driverId: messageObject.driverId },
					{
						$set: {
							location: {
								type: "Point",
								coordinates: [locationLog[0].longitude, locationLog[0].latitude],
							},
							tfcmnId: locationLog[0].tfcmnId,
							updateDt: new Date(),
						},
					},
					{ new: true },
				);
			}
		}
	} catch (err) {
		Console.error(err);
	}

	try {
		if (topic.endsWith("location")) {
			let locationLog: ITopicLocation[] = messageObject.locations;

			const driverConnecting = DriverConnectModel.findOne({
				_id: messageObject.id,
			});

			if (driverConnecting !== null) {
				const docs = await DriverLocationLogModel.findOne({
					driverId: messageObject.driverId,
				});

				if (docs !== null) {
					await DriverLocationLogModel.findOneAndUpdate(
						{ driverId: messageObject.driverId },
						{
							$push: {
								locations: [
									{
										longitude: locationLog[0].longitude,
										latitude: locationLog[0].latitude,
										tfcmnId: locationLog[0].tfcmnId,
										orderNumbers: messageObject.orderNumbers,
										createDt: new Date(),
									},
								],
							},
						},
						{ new: true },
					);
				} else {
					const driverLocation = new DriverLocationLogModel({
						driverId: messageObject.driverId,
						locations: [
							{
								longitude: locationLog[0].longitude,
								latitude: locationLog[0].latitude,
								tfcmnId: locationLog[0].tfcmnId,
								orderNumbers: messageObject.orderNumbers,
								createDt: new Date(),
							},
						],
					});
					await driverLocation.save();
				}
			}
		}
	} catch (err) {
		console.error(err);
	}
};
