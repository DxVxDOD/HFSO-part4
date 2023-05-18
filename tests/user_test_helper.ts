import User from '../models/user.js';

const starterUsers = [
	{
		username: 'Edsger',
		name: 'Edsger W. Dijkstra',
		passwordHash: '123456789',
	},
	{
		username: 'David',
		name: 'David Orban Jozsef',
		passwordHash: '987456123',
	},
];

const newUser = {
	username: 'DavidO',
	name: 'David Orbang Jozsef',
	passwordHash: '987456123',
};

const noPasswordUser = {
	username: 'DavidO',
	name: 'David Orban Jozsef',
};

const noUsernameUser = {
	name: 'David Orban Jozsef',
	passwordHash: '987456123',
};

const usersInDb = async () => {
	const users = await User.find({});
	return users.map(user => user.toJSON());
};

export default {usersInDb, starterUsers, newUser, noPasswordUser, noUsernameUser};
