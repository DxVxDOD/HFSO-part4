import bycrypt from "bcrypt";
import express from "express";
import User from "../models/user.js";

const userRouter = express.Router();

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    author: 1,
    title: 1,
    url: 1,
  });
  response.json(users);
});

userRouter.get("/:id", async (request, response) => {
  const user = await User.findById(request.params.id);
  response.json(user);
});

userRouter.post("/", async (request, response) => {
  const users = (await User.find({})).map((user) => user.username);

  if (request.body === undefined) {
    return response.status(400).json({ error: "Content is missing" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {
    username,
    name,
    password,
  }: { username: string; name: string; password: string } = request.body;

  if (!password) {
    return response.status(400).json({ error: "Password is missing" });
  }

  if (!username) {
    return response.status(400).json({ error: "Username is missing" });
  }

  if (username.length < 3) {
    return response
      .status(400)
      .json({
        error:
          "Username is under 3 characters. Please provide a longer username.",
      });
  }

  if (password.length < 3) {
    return response
      .status(400)
      .json({
        error:
          "Password is under 3 characters. Please provide a longer username.",
      });
  }

  const checkUniqueUser = users.find((user) => user === username);

  if (checkUniqueUser) {
    return response
      .status(400)
      .json({ error: "This username already exists, please choose another." });
  }

  const saltRounds = 10;
  const passwordHash = await bycrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  })!;

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

export default userRouter;
