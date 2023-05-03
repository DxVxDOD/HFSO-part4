/* eslint-disable @typescript-eslint/naming-convention */
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './utils/config.js';
import Blog from './models/blog.js';
import BlogType from './types/blogType.type.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

const PORT = config.PORT!;

// Morgan.token("body", (request) => JSON.stringify({
// 	title: request.body.name,
// 	author: request.body.author,
// 	url: request.body.url,
// 	likes: request.body.likes
// }))

app.get('/api/blogs', (request, response) => {
	Blog.find({})
		.then(blogs => {
			response.json(blogs);
		}).catch(err => {
			console.log(err);
		});
});

app.post('/api/blogs', (request, response) => {
	const blog = new Blog(request.body);

	blog.save()
		.then(result => {
			response.status(201).json(result);
		}).catch(err => {
			console.log(err);
		});
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
