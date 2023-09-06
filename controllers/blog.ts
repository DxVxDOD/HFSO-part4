import express from "express";
import Blog from "../models/blog.js";
import type BlogType from "../types/blogType.type.js";
import User from "../models/user.js";
import middleware from "../utils/middleware.js";

const blogRouter = express.Router();

const { userExtractor } = middleware;

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

blogRouter.post("/", userExtractor, async (request, response, next) => {
  if (request.body === undefined) {
    return response.status(400).json({ error: "content is missing" });
  }

  if (!request.body.likes) {
    Object.assign(request.body, { likes: 0 });
  }

  if (!request.body.author) {
    return response.status(400).json({ error: "author is missing" });
  }

  if (!request.body.title) {
    return response.status(400).json({ error: "title is missing" });
  }

  if (!request.body.url) {
    return response.status(400).json({ error: "url is missing" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { body }: { body: BlogType } = request;

  const { user } = response.locals;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    user: user._id,
  });

  const savedBlog = await blog.save();
  if (!user) {
    return response.status(401).json({ error: "token is invalid" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  user.blogs = user.blogs.concat(savedBlog._id);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  await user.save();

  response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", userExtractor, async (request, response, next) => {
  const user = await User.findById(response.locals.user.id);
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(401).json({ error: "Blog problem" });
  }

  if (!user) {
    return response.status(401).json({ error: "user problem" });
  }

  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
  } else {
    return response
      .status(401)
      .json({ error: "You do not have the permision to delete this blog!" });
  }

  response.status(204).end();
});

blogRouter.put("/:id", userExtractor, async (request, response, next) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { body }: { body: BlogType } = request;
  const { user } = response.locals;

  if (!user) {
    return response.status(401).json({ error: "token is invalid" });
  }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    user: user._id,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
});

export default blogRouter;
