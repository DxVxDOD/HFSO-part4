import lisHelper from '../utils/list_helper.js';
const {bigBlogs} = lisHelper;
const {emptyBlog} = lisHelper;
const {oneBlog} = lisHelper;

describe('Dummy', () => {
	test('dummy return one', () => {
		const blogs = [];
		const result = lisHelper.dummy(blogs);
		expect(result).toBe(1);
	});
});

describe('Total likes', () => {
	test('of empty list is 0', () => {
		const totalLikes = lisHelper.totalLikes(emptyBlog);
		expect(totalLikes).toBe(0);
	});
	test('when list has only one posting', () => {
		const totalLikes = lisHelper.totalLikes(oneBlog);
		expect(totalLikes).toBe(7);
	});
	test('of a large list benig calculated', () => {
		const totalLikes = lisHelper.totalLikes(bigBlogs);
		expect(totalLikes).toBe(36);
	});
});

describe('Favourite blog', () => {
	test('favourtie === highest likes', () => {
		const favourtieBlog = lisHelper.favourtieBlog(bigBlogs);
		expect(favourtieBlog).toEqual({_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
			__v: 0});
	});
});

describe('Most Blogs', () => {
	test('author with the most blogs', () => {
		const mostBlogs = lisHelper.mostBlogs(bigBlogs);
		expect(mostBlogs).toEqual({
			author: 'Robert C. Martin',
			blogs: 3,
		});
	});
});

describe('Most likes', () => {
	test('author with the most likes', () => {
		const mostLikes = lisHelper.mostLikes(bigBlogs);
		expect(mostLikes).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 17,
		});
	});
});
