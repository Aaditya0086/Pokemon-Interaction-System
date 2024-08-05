import Users from '../models/users.js';

  export const getAllUsers = async (req, res) => {
    const users = await Users.readData();
    res.json(users);
  }

  export const createUser = async (req, res) => {
    const users = await Users.readData();
    const newUser = req.body;
    users.push(newUser);
    await Users.writeData(users);
    res.status(201).json(newUser);
  }

  export const updateUser = async (req, res) => {
    const users = await Users.readData();
    const updatedUser = req.body;
    const index = users.findIndex(user => user.id === req.params.id);
    if (index !== -1) {
      users[index] = updatedUser;
      await Users.writeData(users);
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }

  export const deleteUser = async (req, res) => {
    const users = await Users.readData();
    const filteredUsers = users.filter(user => user.id !== req.params.id);
    if (users.length !== filteredUsers.length) {
      await Users.writeData(filteredUsers);
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }