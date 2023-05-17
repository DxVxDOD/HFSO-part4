import Blog from '../models/blog.js';

const bigBlogs = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0,
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0,
	},
];

const validBlog = {
	_id: '5a422aa71b54a676294d87f8',
	title: 'Go To TEST TEST Harmful',
	author: 'Edsger TEST TEST',
	url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
	likes: 50,
	__v: 0,
};

const noAuthorBlog = {
	_id: '521422aa71b54a676294d87f8',
	title: 'TEST To TEST TEST Harmful',
	url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
	likes: 50,
	__v: 0,
};

const noLikesBlog = {
	_id: '5a422aa71b54a676294d87f8',
	title: 'Go To TEST TEST Harmful',
	author: 'Edsger TEST TEST',
	url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
	__v: 0,
};

const nonExistingId = async () => {
	const blog = new Blog({
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0,
	});

	await blog.save();
	await blog.deleteOne();

	return blog._id.toString();
};

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map(blog => blog.toJSON());
};

export default {blogsInDb, nonExistingId, bigBlogs, validBlog, noAuthorBlog, noLikesBlog};
