/* eslint-disable @typescript-eslint/prefer-for-of */
import type BlogType from '../types/blogType.type.js';
import type ModeMapType from '../types/modeMap.type.js';

const dummy = (blog: BlogType[]) => 1;

const totalLikes = (blogs: BlogType[]) => {
	if (blogs.length) {
		return blogs.map((blog: BlogType) => blog.likes).reduce((likeA, likeB) => likeA + likeB, 0);
	}

	return 0;
};

const favourtieBlog = (blogs: BlogType[]) => {
	const likesArray = blogs.map((blog: BlogType) => blog.likes);
	const favouriteBlog = blogs.find((blog: BlogType) => blog.likes === Math.max(...likesArray));
	return favouriteBlog;
};

const mostBlogs = (array: string[]) => {
	if (!array.length) {
		return null;
	}

	const modeMap: ModeMapType = {};
	let maxEl = array[0];
	let maxCount = 1;

	for (let i = 0; i < array.length; i++) {
		const el = array[i];
		if (modeMap[el]) {
			modeMap[el]++;
		} else {
			modeMap[el] = 1;
		}

		if (modeMap[el] > maxCount) {
			maxEl = el;
			maxCount = modeMap[el];
		}
	}

	return {author: maxEl, blogs: maxCount};
};

const emptyBlog = [];

const oneBlog = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0,
	},
];

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
	{
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
		__v: 0,
	},
	{
		_id: '5a422b891b54a676234d17fa',
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 10,
		__v: 0,
	},
	{
		_id: '5a422ba71b54a676234d17fb',
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0,
		__v: 0,
	},
	{
		_id: '5a422bc61b54a676234d17fc',
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
		__v: 0,
	},
];

const authors = bigBlogs.map((blog: BlogType) => blog.author);

export default {dummy, bigBlogs, emptyBlog, oneBlog, totalLikes, favourtieBlog, mostBlogs, authors};
