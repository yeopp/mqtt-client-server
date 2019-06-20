import Mongoose from "mongoose";
import processEnv from "../process_env";
(<any>Mongoose).Promise = Promise;
class MongoDBConnector {
	static start() {
		Mongoose.connect(
			`mongodb://${processEnv.MONGODB_USERNAME}:${processEnv.MONGODB_PASSWORD}@${processEnv.MONGODB_HOST}:${
				processEnv.MONGODB_PORT
			}/${processEnv.MONGODB_DBNAME}`,
			{
				useNewUrlParser: true,
				useFindAndModify: false,
			},
		);
	}
}

export default MongoDBConnector;
