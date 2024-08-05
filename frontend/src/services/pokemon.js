import axios from 'axios';
import { POKE_BASE_URL } from '../constants';

export const getPokemonList = () => axios.get(`${POKE_BASE_URL}/pokemon?limit=1000`);
export const getPokemonDetails = (name) => axios.get(`${POKE_BASE_URL}/pokemon/${name}`);