import jwtDecode from 'jwt-decode';
import { setAuth } from './axios';
export default {
    isAuthenticated() {
        try {
            if (localStorage.token && jwtDecode(localStorage.token)) {
                // check expiry
                return jwtDecode(localStorage.token).user;
            }
        } catch(error) {
            return false;
        }
    },
    logout() {
        setAuth(null)
    }
}