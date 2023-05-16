/* eslint-disable @typescript-eslint/naming-convention */
import config from './utils/config.js';
import express from 'express';
import blogRouter from './controllers/blog.js';
import logger from './utils/logger.js';
import mongoose from 'mongoose';
import cors from 'cors';
import middleware from './utils/middleware.js';

const app = express();

const {MONGO_URI} = config;

mongoose.set('strictQuery', false);

logger.info('connecting to: ', config.MONGO_URI);

mongoose
	.connect(MONGO_URI)
	.then(() => {
		logger.info('connected to MongoDB');
	})
	.catch(error => {
		logger.error('error connecting to MongoDB', error.message);
	});

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blog', blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
