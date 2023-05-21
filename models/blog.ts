/* eslint-disable @typescript-eslint/naming-convention */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import config from '../utils/config.js';

type IBlog = {
	title: string;
	author: string;
	url: string;
	likes: number;
	user: {
		type: typeof mongoose.Schema.Types.ObjectId;
		ref: 'User';
	};
} & mongoose.Document;

dotenv.config();

const {MONGO_URI} = config;

mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URI)
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch(err => {
		console.log('error connecting to MongoDB:', err.message);
	});

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

blogSchema.set('toJSON', {
	transform(document, returnedObject) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		Object.assign(returnedObject, {id: returnedObject._id.toString()});
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Blog = mongoose.model<IBlog>('Blog', blogSchema);

export default Blog;
