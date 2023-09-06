import bycrypt from "bcrypt";
import User from "../models/user.js";
import mongoose from "mongoose";
import supertest from "supertest";
import helper from "./user_test_helper.js";
import app from "../app.js";

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const userObject = helper.starterUsers.map(async (user) => {
    const password = await bycrypt.hash(user.password, 10);
    return new User({ ...user, password });
  })!;
  const promiseArray = userObject.map(async (user) => (await user).save());
  await Promise.all(promiseArray);
});

describe("Users are being posted in the DB", () => {
  test("creating a user with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    await api
      .post("/api/users")
      .send(helper.newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtTheEnd = await helper.usersInDb();
    expect(usersAtTheEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtTheEnd.map((user) => user.username);
    expect(usernames).toContain(helper.newUser.username);
  });

  test("users have password", async () => {
    await api.post("/api/users").send(helper.noPasswordUser).expect(400);

    const userList = await helper.usersInDb();

    expect(userList).toHaveLength(helper.starterUsers.length);
  });

  test("users have username", async () => {
    await api.post("/api/users").send(helper.noUsernameUser).expect(400);

    const userList = await helper.usersInDb();

    expect(userList).toHaveLength(helper.starterUsers.length);
  });

  test("username is shorter than 3 characters", async () => {
    await api.post("/api/users").send(helper.shortUsername).expect(400);

    const userList = await helper.usersInDb();

    expect(userList).toHaveLength(helper.starterUsers.length);
  });

  test("password is shorter than 3 characters", async () => {
    await api.post("/api/users").send(helper.shortPassword).expect(400);

    const userList = await helper.usersInDb();

    expect(userList).toHaveLength(helper.starterUsers.length);
  });

  test("username must be unique", async () => {
    await api.post("/api/users").send(helper.notUniqueUser).expect(400);

    const userList = await helper.usersInDb();

    expect(userList).toHaveLength(helper.starterUsers.length);
  });
});

describe("Users are returned properly from the DB", () => {
  test("users are returned as json", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all users are returned", async () => {
    const response = await api.get("/api/users");
    expect(response.body).toHaveLength(helper.starterUsers.length);
  });
});

afterAll(async () => mongoose.connection.close());
