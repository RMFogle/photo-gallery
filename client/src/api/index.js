import axios from 'axios'

export const BASE_API_URL = 'https://photo-gal-app.herokuapp.com/api/photos';

export const postAPI = async (url, post, token) => {
    const res = await axios.post(`/api/${url}`, post, {
        headers: { Authorization: token }
    })

    return res; 
}

export const getAPI = async (url, token) => {
    const res = await axios.get(`/api/${url}`, {
        headers: { Authorization: token }
    })

    return res;
}

export const deleteAPI = async (url, token) => {
    const res = await axios.delete(`/api/${url}`, {
        headers: { Authorization: token }
    })

    return res; 
}