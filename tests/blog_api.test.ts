/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import mongoose from 'mongoose';
import supertest from 'supertest';
import helper from './test_helper.js';
import app from '../app.js';
import Blog from '../models/blog.js';
import type BlogType from '../types/blogType.type.js';

const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({});
	let blogObject = new Blog(helper.bigBlogs[0]);
	await blogObject.save();
	blogObject = new Blog(helper.bigBlogs[1]);
	await blogObject.save();
});

test('blogs are returned as json', async () => {
	await api
		.get('/api/blog')
		.expect(200)
		.expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
	const response = await api.get('/api/blog');

	expect(response.body).toHaveLength(helper.bigBlogs.length);
});

test('a specific blog is returned', async () => {
	const response = await api.get('/api/blog');
	const contents = response.body.map((resp: BlogType) => resp.title);
	expect(contents).toContain('Go To Statement Considered Harmful');
});

test('a valid note can be added', async () => {
	const newBlog = {
		_id: '5a422aa71b54a676294d87f8',
		title: 'Go To TEST TEST Harmful',
		author: 'Edsger TEST TEST',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 50,
		__v: 0,
	};

	await api
		.post('/api/blog')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/);

	const blogsAtTheEnd = await helper.blogsInDb();
	expect(blogsAtTheEnd).toHaveLength(helper.bigBlogs.length + 1);

	const author = blogsAtTheEnd.map(resp => resp.author);

	expect(author).toContain('Edsger TEST TEST');
});

test('blog without any author is not valid', async () => {
	const newBlog = {
		_id: '521422aa71b54a676294d87f8',
		title: 'TEST To TEST TEST Harmful',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 50,
		__v: 0,
	};

	await api
		.post('/api/blog')
		.send(newBlog)
		.expect(400);

	const blogsAtTheEnd = await helper.blogsInDb();

	expect(blogsAtTheEnd).toHaveLength(helper.bigBlogs.length);
});

afterAll(async () => mongoose.connection.close());
