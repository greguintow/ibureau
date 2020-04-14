import { ConnectionOptions } from 'mongoose'

export const MONGODB_URL =
	process.env.MONGODB_URL || 'mongodb://localhost:27017/ibureau'

export const DB_OPTIONS: ConnectionOptions = {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
	useCreateIndex: true
}
