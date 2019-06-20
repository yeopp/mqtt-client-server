import mongoose from "mongoose";

interface ILocationSchema extends mongoose.Document {
	latitude: number;
	longitude: number;
	orderNumbers: string[];
	tfcmnId: number;
	createDt: Date;
}

interface IDriverLocationLog extends mongoose.Document {
	driverId: number;
	locations: ILocationSchema[];
}

interface IPointSchema extends mongoose.Document {
	type: "Point";
	coordinates: number[];
}

interface IDriverConnect extends mongoose.Document {
	driverId: number;
	location: IPointSchema;
	tfcmnId: number;
	createDt: Date;
	updateDt: Date;
}
