import type mongoose from 'mongoose';

type User = {
	username: string;
	name: string;
	password: string;
	blogs: [
		{
			type: typeof mongoose.Schema.Types.ObjectId;
			ref: string;
		},
	];
};

export default User;
