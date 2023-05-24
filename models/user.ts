/* eslint-disable @typescript-eslint/naming-convention */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import config from '../utils/config.js';
import uniqueValidator from 'mongoose-unique-validator';

type Blogs = {
	type: mongoose.Schema.Types.ObjectId;
	ref: 'Blog';
};

type IUser = {
	username: string;
	name: string;
	passwordHash: string;
	blogs: Blogs[];
};

dotenv.config();

const {MONGO_URI} = config;

mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URI)
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch(err => {
		console.log('error connecting to MongoDB', err.message);
	});

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	name: String,
	passwordHash: String,
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Blog',
		},
	],
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
	transform(document, returnedObject) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.passwordHash;
	},
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
