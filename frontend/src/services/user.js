import axios from 'axios';
import { BASE_URL } from '../constants/index';

export const getUsers = () => {
    return axios({
        method: 'get',
        url: BASE_URL + "/user",
    })
}

export const getUser = (id) => {
    return axios({
        method: 'get',
        url: BASE_URL + "/user/" + id,
    })
}

export const createUser = (user) => {
    return axios({
        method: 'post',
        url: BASE_URL + "/user",
        data: user,
    })
}

export const updateUser = (id, user) => {
    return axios({
        method: 'put',
        url: BASE_URL + "/user/" + id,
        data: user,
    })
}

export const deleteUser = (id) => {
    return axios({
        method: 'delete',
        url: BASE_URL + "/user/" + id,
    })
}

export const deleteAllUsers = () => {
    return axios({
        method: 'delete',
        url: BASE_URL + "/user" + "/delete-all",
    })
}