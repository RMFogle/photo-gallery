import { GET_ERRORS } from "../constants/actionTypes";

const errorsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ERRORS:
            return action.errors;
        default:
            return state;
        }
    };
    
export default errorsReducer;