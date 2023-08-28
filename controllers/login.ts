import jwt from 'jsonwebtoken';
import bycrypt from 'bcrypt';
import express from 'express';
import User from '../models/user.js';
import config from '../utils/config.js';

const loginRouter = express.Router();

loginRouter.post('/', async (request, response) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const {username, password}: {username: string; password: string} = request.body;

	const user = await User.findOne({username});
	const passwordCorrect = user === null ? false : await bycrypt.compare(password, user.passwordHash);

	if (user && passwordCorrect) {
		const userForToken = {
			username: user.username,
			id: user._id,
		};
		const token = jwt.sign(userForToken, config.SECRET);

		return response.status(200).send({token, username: user.username, name: user.name});
	}

	response.status(401).json({error: 'invalid username or password'});
});

export default loginRouter;
