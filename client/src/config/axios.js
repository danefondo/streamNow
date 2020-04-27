import axios from "axios" // eslint-disable-line
import { BASE_PATH } from "../constants"

export const setAuth = (token, redirect = true) => {
    if (!token) {
        localStorage.clear()
        localStorage.removeItem('token');
        localStorage.removeItem('isLive');
        localStorage.removeItem('active_stream_id');
        delete axios.defaults.headers.common.Authorization;
    }
    if (redirect) {
        window.location.replace('/')
    }
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const setGlobals = () => {
    axios.defaults.baseURL = BASE_PATH
    if (localStorage.getItem('token')) {
        axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
}

// Set initial auth token
