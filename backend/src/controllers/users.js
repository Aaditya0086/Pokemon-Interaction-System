import Users from "../models/users.js";

export const getAllUsers = async (req, res) => {
  const users = await Users.readData();
  res.json(users);
};

export const getUser = async (req, res) => {
  try {
    const users = await Users.readData();
    const userId = req.params.id;
    console.log(userId);
    const user = users.find((user) => user.id === userId);
    if (user) {
        res.json(user);
    }else {
        res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting user", error });
  }
};

export const createUser = async (req, res) => {
  const users = await Users.readData();
  const newUser = req.body;
  users.push(newUser);
  await Users.writeData(users);
  res.status(201).json(newUser);
};

export const updateUser = async (req, res) => {
  const users = await Users.readData();
  const updatedUser = req.body;
  const index = users.findIndex((user) => user.id === req.params.id);
  if (index !== -1) {
    users[index] = updatedUser;
    await Users.writeData(users);
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const deleteUser = async (req, res) => {
  const users = await Users.readData();
  const filteredUsers = users.filter((user) => user.id !== req.params.id);
  if (users.length !== filteredUsers.length) {
    await Users.writeData(filteredUsers);
    res.json({ message: "User deleted" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const deleteAllUsers = async (req, res) => {
  try {
    const users = await Users.readData();
    if (users.length === 0) {
      return res.json({ message: "User list already empty" });
    }
    await Users.writeData([]);
    res.json({ message: "All users deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting users", error });
  }
};
