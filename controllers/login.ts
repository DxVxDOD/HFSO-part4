import jwt from 'jsonwebtoken';
import bycrypt from 'bcrypt';
import express from 'express';
import User from '../models/user.js';
import config from '../utils/config.js';

const loginRouter = express.Router();

loginRouter.post('/', async (request, response) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const {username, passwordHash}: {username: string; passwordHash: string} = request.body;

	const user = await User.findOne({username});
	const passwordHashCorrect = user === null ? false : await bycrypt.compare(passwordHash, user.passwordHash);

	if (!(user && passwordHashCorrect)) {
		return response.status(401).json({error: 'invalid username or passwordHash'});
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	};

	const token = jwt.sign(userForToken, config.SECRET);

	response.status(200).send({token, username: user.username, name: user.name});
});

export default loginRouter;
