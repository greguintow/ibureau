import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { DB_OPTIONS } from '../src/config'

let mongod: MongoMemoryServer

beforeAll(async () => {
	mongod = new MongoMemoryServer()

	const uri = await mongod.getConnectionString()

	await mongoose.connect(uri, DB_OPTIONS)
})

afterAll(async () => {
	await mongoose.disconnect()

	await mongod.stop()
})
