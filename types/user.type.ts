import type mongoose from 'mongoose';

type User = {
	username: string;
	name: string;
	password: string;
	notes: [
		{
			type: typeof mongoose.Schema.Types.ObjectId;
			ref: string;
		},
	];
};

export default User;
