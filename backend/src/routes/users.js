import express from 'express';
import { getAllUsers, createUser, updateUser, deleteUser } from '../controllers/users.js';

const user = express.Router();

user
    .get('/', getAllUsers)
    .post('/', createUser)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser)

export default user;