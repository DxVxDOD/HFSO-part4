import express from 'express';
import Blog from '../models/blog.js';
import {nextTick} from 'process';
import type BlogType from '../types/blogType.type.js';

const blogRouter = express.Router();

blogRouter.get('/', (request, response) => {
	Blog.find({})
		.then(blogs => {
			response.json(blogs);
		}).catch(err => {
			console.log(err);
		});
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

blogRouter.post('/', (request, response) => {
	const blog = new Blog(request.body);

	blog.save()
		.then(result => {
			response.status(201).json(result);
		}).catch(err => {
			console.log(err);
		});
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
