import { AUTH, ALERT } from '../constants/actionTypes'
import { postAPI, getAPI } from "../api/index";
import { validRegister } from "../utils/valid";

export const login = (userLogin) => 
    async (dispatch) => {
        try {
            dispatch({ type: ALERT, payload: { loading: true } })
            const res = await postAPI('login', userLogin);

            dispatch({ type: AUTH, payload: res.data });

            dispatch({ type: ALERT, payload: { success: res.data.msg } })
            localStorage.setItem('logged', 'photo-gallery')
        } catch (err) {
            dispatch({ type: ALERT, payload: { errors: err.response.data.msg }})
        }
    }

export const register = (userRegister) => 
    async (dispatch) => {
        const check = validRegister(userRegister)

        if(check.errLength > 0)
            return dispatch({ type: ALERT, payload: { errors: check.errMsg } })
        
        try {
            dispatch({ type: ALERT, payload: { loading: true } })

            const res = await postAPI('register', userRegister)

            dispatch({ type: ALERT, payload: { success: res.data.msg } })
        } catch (err) {
            dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
        }
    }

export const refreshToken = () => 
    async (dispatch) => {
        const logged = localStorage.getItem('logged')
        if(logged !== 'photo-gallery') return;

        try {
            dispatch({ type: ALERT, payload: { loading: true } })

            const res = await getAPI('refresh_token')

            dispatch({ type: AUTH, payload: res.data })

            dispatch({ type: ALERT, payload: { } })
        } catch (err) {
            dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
        }
    }

export const logout = () =>
    async (dispatch) => {
        try {
            localStorage.removeItem('logged')
            await getAPI('logout')
            window.location.href = "/"
        } catch (err) {
            dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
        }
    }

export const googleLogin = (id_token) =>
    async (dispatch) => {
        try {
            dispatch({ type: ALERT, payload: { loading: true } })

            const res = await postAPI('google_login', { id_token })

            dispatch({ type: AUTH, payload: res.data })

            dispatch({ type: ALERT, payload: { success: res.data.msg } })
            localStorage.setItem('logged', 'photo-gallery')
        } catch (err) {
            dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
        }
    }