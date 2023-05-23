import express from 'express';
import Blog from '../models/blog.js';
import type BlogType from '../types/blogType.type.js';
import User from '../models/user.js';
import type mongoose from 'mongoose';

const blogRouter = express.Router();

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', {author: 1, title: 1});
	response.json(blogs);
});

blogRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id);
	response.json(blog);
});

blogRouter.post('/', async (request, response, next) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const {body}: {body: BlogType} = request;

	const user = (await User.findById(body.userId))!;

	if (!body.likes) {
		Object.assign(body, {likes: 0});
	}

	// if (body === undefined || !body.author || !body.title || !body.url) {
	// 	return response.status(400).json({error: 'content is missing'});
	// }

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		user: user.id,
	});

	const savedBlog = await blog.save();
	let userBlogs: Array<{type: typeof mongoose.Schema.Types.ObjectId; ref: 'Blog'}> = user.blogs;
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	userBlogs = userBlogs.concat(savedBlog._id);
	await user.save();
	response.status(201).json(savedBlog);
});

blogRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id);
	response.status(204).end();
});

blogRouter.put('/:id', async (request, response, next) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const {body}: {body: BlogType} = request;

	const blog = {
		_id: body._id,
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	};

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true});
	response.json(updatedBlog);
});

export default blogRouter;
