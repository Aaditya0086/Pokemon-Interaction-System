import express from 'express';
import { getAllUsers, createUser, updateUser, deleteUser, deleteAllUsers, getUser, addToUser } from '../controllers/users.js';

const user = express.Router();

user
    .get('/', getAllUsers)
    .post('/', createUser)
    .delete('/delete-all', deleteAllUsers)
    .post('/:id', addToUser)
    .get('/:id', getUser)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser)

export default user;