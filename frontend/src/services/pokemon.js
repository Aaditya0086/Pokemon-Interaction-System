import axios from 'axios';
import { BASE_URL, POKE_BASE_URL } from '../constants/index';

export const getPokemonList = () => {
    return axios({
        method: 'get',
        url: POKE_BASE_URL + "/pokemon" + "?limit=" + 1302,
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

export const getSearchedPokemons = (search) => {
    return axios({
        method: 'get',
        url: BASE_URL + "/pokemon/search?name=" + search,
    })
}
