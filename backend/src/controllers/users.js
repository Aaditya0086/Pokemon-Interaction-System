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
    } else {
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
  const updatedPokemons = req.body.pokemons;
  const updatedNoOfPokemons = req.body.noOfPokemon;
  const index = users.findIndex((user) => user.id === req.params.id);
  if (index !== -1) {
    users[index].noOfPokemon = updatedNoOfPokemons;
    users[index].pokemons[0] = updatedPokemons;
    await Users.writeData(users);
    res.json(updatedPokemons);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const addToUser = async (req, res) => {
  const users = await Users.readData();
  const newPokemon = req.body.pokemons;
  const updatedNoOfPokemons = req.body.noOfPokemon;
  console.log(updatedNoOfPokemons);
  const index = users.findIndex((user) => user.id === req.params.id);
  if (index !== -1 && users[index].pokemons.length >= 1) {
    users[index].noOfPokemon = updatedNoOfPokemons;
    users[index].pokemons.push(newPokemon);
    await Users.writeData(users);
    res.json(newPokemon);
  }else {
    res.status(404).json({ message: "User must have 1 pokemon to catch/add more." });
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
