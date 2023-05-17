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

describe('Checking how blogs are returned', () => {
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
});

describe('Checks how blogs are posted', () => {
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
});

describe('Checking proper property name', () => {
	test('checks if the identifier property is named id', async () => {
		const response = await api.get('/api/blog');
		const id = response.body.map((blog: BlogType) => blog._id);

		expect(id).toBeDefined();
	});
});

describe('Deleting a blog post', () => {
	test('checks if deletion was succesful', async () => {
		const blogList = await helper.blogsInDb();
		const blogToDelete = blogList[0];

		await api
			.delete(`/api/blog/${blogToDelete._id.toString()}`)
			.expect(204);

		const bloglistAtEnd = await helper.blogsInDb();
		expect(bloglistAtEnd).toHaveLength(helper.bigBlogs.length - 1);

		const authors = bloglistAtEnd.map(blog => blog.author);

		expect(authors).not.toContain(blogToDelete.author);
	});
});

describe('Updating a blog post', () => {
	test('checks if a post has succesfully ben updated by the number of likes', async () => {
		const bloglist = await helper.blogsInDb();
		const blogToUpadate = bloglist[0];
		blogToUpadate.likes! += 10;
		await api
			.put(`/api/blog/${blogToUpadate._id.toString()}`)
			.send(blogToUpadate)
			.expect(200);

		const blogDbLikes = (await helper.blogsInDb()).map(blog => blog.likes).reduce((acc, curr) => acc! + curr!, 0);
		const initialDbLikes = helper.bigBlogs.map(blogs => blogs.likes).reduce((acc, curr) => acc + curr, 0);

		expect(blogDbLikes).not.toEqual(initialDbLikes);
	});
});

afterAll(async () => mongoose.connection.close());
