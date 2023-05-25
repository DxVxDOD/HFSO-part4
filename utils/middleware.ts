import {type NextFunction, type Request, type Response, type ErrorRequestHandler} from 'express';
import logger from './logger.js';

const requestLogger = (request: Request, response: Response, next: NextFunction) => {
	logger.info('Method', request.method);
	logger.info('Path', request.path);
	logger.info('Body', request.body);
	logger.info('---');
	next();
};

const unknownEndpoint = (request: Request, response: Response) => {
	response.status(404).send({error: 'unknown endpoint'});
};

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
	logger.error(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send({error: 'malformed id'});
	}

	if (error.name === 'ValidationError') {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		return response.status(400).json({error: error.message});
	}

	if (error.name === 'JsonWebTokenError') {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		return response.status(400).json({error: error.message});
	}

	next(error);
};

const tokenExtractor = (request: Request, next: NextFunction) => {
	const auth = request.get('authorization');
	if (auth?.startsWith('Bearer ')) {
		return auth.replace('Bearer ', '');
	}

	next();
};

export default {unknownEndpoint, errorHandler, requestLogger, tokenExtractor};
