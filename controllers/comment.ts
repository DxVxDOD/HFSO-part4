import express from "express";
import Comment from "../models/comments.js";
import middleware from "../utils/middleware.js";

const commentRouter = express.Router();

const { userExtractor } = middleware;

commentRouter.get("/", async (request, respones) => {
  const comments = await Comment.find({});
  respones.json(comments);
});

commentRouter.post("/", async (request, response) => {
  if (request.body === undefined) {
    return response.status(400).json({ error: "Content is missing" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { content }: {content: string} = request.body;

  const comment = new Comment({
    content
  });

  const savedComment = await comment.save();

  response.status(201).json(savedComment);
});

export default commentRouter;
