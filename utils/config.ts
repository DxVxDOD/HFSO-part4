/* eslint-disable @typescript-eslint/naming-convention */
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.NODE_ENV === 'test'
	? process.env.TEST_MONGO_URI!
	: process.env.MONGO_URI!;
const {PORT} = process.env;

export default {MONGO_URI, PORT};
