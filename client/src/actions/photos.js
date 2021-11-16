import axios from 'axios';
import { DELETE_PHOTO, LOAD_PHOTOS } from '../constants/actionTypes';
import { PHOTO_API_URL } from '../api/config';
import { getErrors } from './errors';

export const beginAddPhoto = (photo) => {
    return async (dispatch) => {
        try {
        const formData = new FormData();
        formData.append('photo', photo);
        await axios.post(PHOTO_API_URL, formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        });
        } catch (error) {
        error.response && dispatch(getErrors(error.response.data));
        }
    };
};

export const startLoadPhotos = () => {
    return async (dispatch) => {
        try {
        const photos = await axios.get(PHOTO_API_URL);
        dispatch(loadPhotos(photos.data));
        } catch (error) {
        error.response && dispatch(getErrors(error.response.data));
        }
    };
};

export const loadPhotos = (photos) => ({
    type: LOAD_PHOTOS,
    photos
});

export const deletePhoto = (id) => {
    return async (dispatch) => {
        try {
        await axios.delete(`${PHOTO_API_URL}/${id}`);

        dispatch({ type: DELETE_PHOTO, payload: id });
        } catch (error) {
        error.response && dispatch(getErrors(error.response.data));
        }
    }
}