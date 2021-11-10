import { GET_ERRORS } from "../constants/actionTypes";

export const getErrors = (errors) => ({
    type: GET_ERRORS,
    errors
});