import { LOAD_PHOTOS, DELETE_PHOTO } from "../constants/actionTypes";

const photosReducer = (state = [], action) => {
    switch (action.type) {
        case LOAD_PHOTOS:
            return action.photos;
        case DELETE_PHOTO:
            return state.filter((photo) => photo._id !== action.payload);
        default:
            return state;
        }
    };
    
export default photosReducer;