import express from 'express';
import { getAllUsers, createUser, updateUser, deleteUser, deleteAllUsers, getUser } from '../controllers/users.js';

const user = express.Router();

user
    .get('/', getAllUsers)
    .post('/', createUser)
    .delete('/delete-all', deleteAllUsers)
    .get('/:id', getUser)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser)

export default user;