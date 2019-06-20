import mongoose, { model } from "mongoose";
import { ILocationSchema, IDriverLocationLog, IPointSchema, IDriverConnect } from "../@types/model";

export const locationSchema = new mongoose.Schema<ILocationSchema>(
	{
		latitude: Number,
		longitude: Number,
		orderNumbers: Array,
		tfcmnId: Number,
		createDt: Date,
	},
	{ _id: false },
);

export const DriverLocationLog = new mongoose.Schema<IDriverLocationLog>({
	driverId: { type: Number, required: true },
	locations: [{ type: locationSchema, required: true }],
});

export const pointSchema = new mongoose.Schema<IPointSchema>(
	{
		type: {
			type: String,
			enum: ["Point"],
			required: true,
		},
		coordinates: {
			type: [Number],
			required: true,
		},
	},
	{ _id: false },
);

export const DriverConnect = new mongoose.Schema<IDriverConnect>(
	{
		driverId: Number,
		location: {
			type: pointSchema,
			required: true,
		},
		tfcmnId: Number,
		createDt: Date,
		updateDt: Date,
	},
	{ _id: false },
);

export const DriverConnectModel = model("driverConnect", DriverConnect, "driver_connect");
export const DriverLocationLogModel = model("driver_location_log", DriverLocationLog, "driver_location_log");
