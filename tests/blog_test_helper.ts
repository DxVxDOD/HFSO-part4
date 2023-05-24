import Blog from '../models/blog.js';
import type BlogType from '../types/blogType.type.js';

const bigBlogs = [
	{
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,

	},
	{
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,

	},
];

const validBlog = {
	title: 'Go To TEST TEST Harmful',
	author: 'Edsger TEST TEST',
	url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
	likes: 50,
};

const noAuthorBlog = {
	id: '521422aa71b54a676294d87f8',
	title: 'TEST To TEST TEST Harmful',
	url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
	likes: 50,
};

const noLikesBlog = {
	title: 'Go To TEST TEST Harmful',
	author: 'Edsger TEST TEST',
	url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
};

const noTitleBlog = {
	author: 'Edsger TEST TEST',
	url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
	likes: 50,
};

const noUrlBlog = {
	title: 'Go To TEST TEST Harmful',
	author: 'Edsger TEST TEST',
	likes: 50,
};

const nonExistingId = async () => {
	const blog = new Blog({
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,

	})!;

	await blog.save();
	await blog.deleteOne();

	// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
	return blog.id.toString();
};

const blogsInDb = async (): Promise<BlogType[]> => {
	const blogs = await Blog.find({});
	return blogs.map(blog => blog.toJSON());
};

export default {blogsInDb, nonExistingId, bigBlogs, validBlog, noAuthorBlog, noLikesBlog, noTitleBlog, noUrlBlog};
