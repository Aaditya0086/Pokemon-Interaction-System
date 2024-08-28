// src/services/api.js
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api';
// const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2';

// export const getUsers = () => axios.get(`${API_BASE_URL}/users`);
// export const createUser = (user) => axios.post(`${API_BASE_URL}/users`, user);
// export const updateUser = (id, user) => axios.put(`${API_BASE_URL}/users/${id}`, user);
// export const deleteUser = (id) => axios.delete(`${API_BASE_URL}/users/${id}`);

// export const getPokemonList = () => axios.get(`${POKE_API_BASE_URL}/pokemon?limit=1000`);
// export const getPokemonDetails = (name) => axios.get(`${POKE_API_BASE_URL}/pokemon/${name}`);


import express from "express";
import user from './users.js';
import pokemon from "./pokemons.js";

const api = express.Router();

api.use('/user', user);
api.use('/pokemon', pokemon);


export default api;