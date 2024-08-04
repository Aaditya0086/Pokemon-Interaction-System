// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = 'pokemonUsers.json';

// Read data from file
async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Write data to file
async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET all pokemon users
app.get('/api/users', async (req, res) => {
  const users = await readData();
  res.json(users);
});

// POST new pokemon user
app.post('/api/users', async (req, res) => {
  const users = await readData();
  const newUser = req.body;
  users.push(newUser);
  await writeData(users);
  res.status(201).json(newUser);
});

// PUT update pokemon user
app.put('/api/users/:id', async (req, res) => {
  const users = await readData();
  const updatedUser = req.body;
  const index = users.findIndex(user => user.id === req.params.id);
  if (index !== -1) {
    users[index] = updatedUser;
    await writeData(users);
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// DELETE pokemon user
app.delete('/api/users/:id', async (req, res) => {
  const users = await readData();
  const filteredUsers = users.filter(user => user.id !== req.params.id);
  if (users.length !== filteredUsers.length) {
    await writeData(filteredUsers);
    res.json({ message: 'User deleted' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));