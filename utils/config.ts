/* eslint-disable @typescript-eslint/naming-convention */
import dotenv from 'dotenv';
dotenv.config();

const {MONGO_URI} = process.env;
const {PORT} = process.env;

export default {MONGO_URI, PORT};
