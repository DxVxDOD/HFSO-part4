import express from 'express';
import Blog from '../models/blog.js';
import {nextTick} from 'process';
import type BlogType from '../types/blogType.type.js';

const blogRouter = express.Router();

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs);
});

blogRouter.get('/:id', (request, response, next) => {
	Blog.findById(request.params.id)
		.then(blog => {
			if (blog) {
				response.json(blog);
			} else {
				response.status(404).end();
			}
		})
		.catch(err => {
			next(err);
		});
});

blogRouter.post('/', async (request, response, next) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const {body}: {body: BlogType} = request;

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	});

	if (body === undefined || !body.author || !body.title || !body.likes || !body.url) {
		return response.status(400).json({error: 'content is missing'});
	}

	try {
		const savedBlog = await blog.save();
		response.status(201).json(savedBlog);
	} catch (exepcion) {
		next(exepcion);
	}
});

blogRouter.delete('/:id', (request, response, next) => {
	Blog.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end();
		})
		.catch(err => {
			next(err);
		});
});

blogRouter.put('/:id', (request, response, next) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const {body}: {body: BlogType} = request;

	const blog: BlogType = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	};

	Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
		.then(updatedBlog => response.json(updatedBlog))
		.catch(err => {
			next(err);
		});
});

export default blogRouter;
