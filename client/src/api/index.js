import axios from 'axios'
import { API_URL } from './config';

export const postAPI = async (url, post, token) => {
    const res = await axios.post(`${API_URL}/api/${url}`, post, {
        headers: { Authorization: token }
    })

    return res; 
}

export const getAPI = async (url, token) => {
    const res = await axios.get(`${API_URL}/api/${url}`, {
        headers: { Authorization: token }
    })

    return res;
}

export const deleteAPI = async (url, token) => {
    const res = await axios.delete(`${API_URL}/api/${url}`, {
        headers: { Authorization: token }
    })

    return res; 
}