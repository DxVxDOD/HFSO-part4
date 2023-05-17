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

	const blogObject = helper.bigBlogs.map(blog => new Blog(blog));
	const promiseArray = blogObject.map(async blog => blog.save());
	await Promise.all(promiseArray);
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
	await api
		.post('/api/blog')
		.send(helper.validBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/);

	const blogsAtTheEnd = await helper.blogsInDb();
	expect(blogsAtTheEnd).toHaveLength(helper.bigBlogs.length + 1);

	const author = blogsAtTheEnd.map(resp => resp.author);

	expect(author).toContain('Edsger TEST TEST');
});

test('blog without any author is not valid', async () => {
	await api
		.post('/api/blog')
		.send(helper.noAuthorBlog)
		.expect(400);

	const blogsAtTheEnd = await helper.blogsInDb();

	expect(blogsAtTheEnd).toHaveLength(helper.bigBlogs.length);
});

test('if the likes property is missing it defaults to 0', async () => {
	await api
		.post('/api/blog')
		.send(helper.noLikesBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/);

	const blogList = await helper.blogsInDb();
	const noLike = blogList.map(blog => blog.likes === 0).includes(true);

	expect(noLike).toBe(true);
	expect(blogList).toHaveLength(helper.bigBlogs.length + 1);
});

test('if title or url are missing respond with 400 Bad Request', async () => {
	await api
		.post('/api/blog')
		.send(helper.noUrlBlog)
		.expect(400);

	await api
		.post('/api/blog')
		.send(helper.noTitleBlog)
		.expect(400);

	const blogList = await helper.blogsInDb();

	expect(blogList).toHaveLength(helper.bigBlogs.length);
});

test('checks if the identifier property is named id', async () => {
	const response = await api.get('/api/blog');
	const id = response.body.map((blog: BlogType) => blog._id);

	expect(id).toBeDefined();
});

afterAll(async () => mongoose.connection.close());
