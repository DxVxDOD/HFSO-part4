import express from 'express';
import Blog from '../models/blog.js';
import type BlogType from '../types/blogType.type.js';
import User from '../models/user.js';

const blogRouter = express.Router();

blogRouter.get('/', async (request, response) => {

	const blogs = await Blog.find({}).populate('user', {username: 1, name: 1});

	response.json(blogs);
});

blogRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id);
	response.json(blog);
});

blogRouter.post('/', async (request, response, next) => {
	if (request.body === undefined) {
		return response.status(400).json({error: 'content is missing'});
	}

	if (!request.body.likes) {
		Object.assign(request.body, {likes: 0});
	}

	if (!request.body.author) {
		return response.status(400).json({error: 'author is missing'});
	}

	if (!request.body.title) {
		return response.status(400).json({error: 'title is missing'});
	}
  
	if (!request.body.url) {
		return response.status(400).json({error: 'url is missing'});
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const {body}: {body: BlogType} = request;

	const user = await User.findById(body.userId);

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user?._id,
	});

	const savedBlog = await blog.save();
	if (user !== null) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		user.blogs = user?.blogs.concat(savedBlog._id);
	}

	await user?.save();

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
		id: body.id,
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	};

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true});
	response.json(updatedBlog);
});

export default blogRouter;
