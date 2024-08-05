import axios from 'axios';
import { BASE_URL } from '../constants';

export const getUsers = () => axios.get(`${BASE_URL}/users`);
export const createUser = (user) => axios.post(`${BASE_URL}/users`, user);
export const updateUser = (id, user) => axios.put(`${BASE_URL}/users/${id}`, user);
export const deleteUser = (id) => axios.delete(`${BASE_URL}/users/${id}`);