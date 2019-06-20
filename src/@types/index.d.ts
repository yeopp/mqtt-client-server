export interface ITopicLocation {
	latitude: number;
	longitude: number;
	tfcmnId: number;
}

export interface ITopicMessageObject {
	id: string;
	driverId: string;
	orderNumbers: string[];
	locations: ITopicLocation[];
}
