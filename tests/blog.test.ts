import lisHelper from '../utils/list_helper.js';

describe('Dummy', () => {
	test('dummy return one', () => {
		const blogs = [];
		const result = lisHelper.dummy(blogs);
		expect(result).toBe(1);
	});
});

describe('Total likes', () => {
	test('of empty list is 0', () => {
		const {emptyBlog} = lisHelper;
		const totalLikes = lisHelper.totalLikes(emptyBlog);
		expect(totalLikes).toBe(0);
	});
	test('when list hsa only one posting', () => {
		const {oneBlog} = lisHelper;
		const totalLikes = lisHelper.totalLikes(oneBlog);
		expect(totalLikes).toBe(7);
	});
	test('of a large list benig calculated', () => {
		const {bigBlogs} = lisHelper;
		const totalLikes = lisHelper.totalLikes(bigBlogs);
		expect(totalLikes).toBe(36);
	});
});

describe('Favourite blog', () => {
	test('favourtie === highest likes', () => {
		const {bigBlogs} = lisHelper;
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
		const {bigBlogs} = lisHelper;
		const mostBlogs = lisHelper.mostBlogs(bigBlogs);
		expect(mostBlogs).toEqual({
			author: 'Robert C. Martin',
			blogs: 3,
		});
	});
});
