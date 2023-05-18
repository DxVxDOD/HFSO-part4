import bycrypt from 'bcrypt';
import express from 'express';
import User from '../models/user.js';

const userRouter = express.Router();

userRouter.get('/', async (request, response) => {
	const users = await User.find({});
	response.json(users);
});

userRouter.get('/:id', async (request, response) => {
	const user = await User.findById(request.params.id);
	response.json(user);
});

userRouter.post('/', async (request, response) => {
	// if (request.body === undefined) {
	// 	return response.status(400).json({error: 'content is missing'});
	// }

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const {username, name, passwordHash}: {username: string; name: string; passwordHash: string} = request.body;

	// if (!password) {
	// 	return response.status(400).json({error: 'Password is missing'});
	// }

	// if (!username) {
	// 	return response.status(400).json({error: 'Username is missing'});
	// }

	const saltRounds = 10;
	const passwordHashEd = await bycrypt.hash(passwordHash, saltRounds);

	const user = new User({
		username,
		name,
		passwordHashEd,
	});

	const savedUser = await user.save();
	response.status(201).json(savedUser);
});

export default userRouter;
