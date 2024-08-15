import axios from 'axios';
import { POKE_BASE_URL } from '../constants/index';

export const getPokemonList = () => {
    return axios({
        method: 'get',
        url: POKE_BASE_URL + "/pokemon" + "?limit=" + 1000,
    })
} 

export const getPokemonListLazy = (limit, offset) => {
    return axios({
        method: 'get',
        url: POKE_BASE_URL + "/pokemon" + "?limit=" + limit + "&offset=" + offset,
    })
} 

export const getPokemonListOnSearch = (input) => {
    return axios({
        method: 'get',
        url: POKE_BASE_URL + "/pokemon" + "?limit=10&offset=0&search=" + input,
    })
} 

export const getPokemonDetails = (name) => {
    return axios({
        method: 'get',
        url: POKE_BASE_URL + "/pokemon/" + name,
    })
}
// export const getPokemonDetails = (name) => axios.get(`${POKE_BASE_URL}/pokemon/${name}`);
