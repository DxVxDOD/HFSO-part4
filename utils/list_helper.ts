/* eslint-disable @typescript-eslint/prefer-for-of */
import type MostLikes from "../types/mostLikes.type.js";

type Blog = {
  id: string;
  title: string;
  author: string;
  url: string;
  likes: number;
};

const emptyBlog = [];

const oneBlog = [
  {
    id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
];

const bigBlogs = [
  {
    id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];

const dummy = (blog: Blog[]) => 1;

const totalLikes = (blogs: Blog[]) => {
  if (blogs.length) {
    return blogs
      .map((blog: Blog) => blog.likes)
      .reduce((likeA, likeB) => likeA + likeB, 0);
  }

  return 0;
};

const favourtieBlog = (blogs: Blog[]) => {
  const likesArray = blogs.map((blog: Blog) => blog.likes);
  const favouriteBlog = blogs.find(
    (blog: Blog) => blog.likes === Math.max(...likesArray),
  );
  return favouriteBlog;
};

const mostBlogs = (blogs: Blog[]) => {
  const authorArray = blogs.map((blog: Blog) => blog.author);

  if (!authorArray.length) {
    return null;
  }

  const modeMap: Record<string, number> = {};
  let maxEl = authorArray[0];
  let maxCount = 1;

  for (let i = 0; i < authorArray.length; i++) {
    const el = authorArray[i];
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

  return { author: maxEl, blogs: maxCount };
};

const mostLikes = (blogs: Blog[]) => {
  const authors = blogs.map((blog: Blog) => blog.author);
  const uniqAuthors = [...new Set(authors)];
  const authorLikeArray: MostLikes[] = [];

  for (let i = 0; i < uniqAuthors.length; i++) {
    for (let u = 0; u < blogs.length; u++) {
      if (uniqAuthors[i] === blogs[u].author) {
        authorLikeArray.push({
          author: blogs[u].author,
          likes: blogs[u].likes,
        });
      }
    }
  }

  const uniqAuthorsAllLikes = authorLikeArray.reduce(
    (acc: MostLikes[], curr: MostLikes) => {
      const { author, likes } = curr;
      const found: MostLikes = acc.find(
        (item: MostLikes) => item.author === author,
      )!;

      if (found) {
        found.likes += likes;
      } else {
        acc.push(curr);
      }

      return acc;
    },
    [],
  );

  const mostLikes = uniqAuthorsAllLikes.reduce((acc, curr) =>
    curr.likes > acc.likes ? curr : acc,
  );

  return mostLikes;
};

export default {
  dummy,
  bigBlogs,
  emptyBlog,
  oneBlog,
  totalLikes,
  favourtieBlog,
  mostBlogs,
  mostLikes,
};
