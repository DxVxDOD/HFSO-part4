import User from "../models/user.js";

const starterUsers = [
  {
    username: "Edsger",
    name: "Edsger W. Dijkstra",
    password: "123456789",
  },
  {
    username: "David",
    name: "David Orban Jozsef",
    password: "987456123",
  },
];

const newUser = {
  username: "DavidO",
  name: "David Orbang Jozsef",
  password: "987456123",
};

const noPasswordUser = {
  username: "DavidO",
  name: "David Orban Jozsef",
};

const noUsernameUser = {
  name: "David Orban Jozsef",
  password: "987456123",
};

const shortUsername = {
  username: "Da",
  name: "David Orbang Jozsef",
  password: "987456123",
};

const shortPassword = {
  username: "DavidO",
  name: "David Orbang Jozsef",
  password: "98",
};

const notUniqueUser = {
  username: "David",
  name: "David Orban Jozsef",
  password: "987456123",
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

export default {
  usersInDb,
  starterUsers,
  newUser,
  noPasswordUser,
  noUsernameUser,
  shortPassword,
  shortUsername,
  notUniqueUser,
};
