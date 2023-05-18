/* eslint-disable @typescript-eslint/naming-convention */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import config from '../utils/config.js';

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
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject.__v;
	},
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
