import jwtDecode from 'jwt-decode';
import { setAuth } from './axios';
export default {
    isAuthenticated() {
        try {
            if (localStorage.token && jwtDecode(localStorage.token)) {
                // check expiry
                const user = jwtDecode(localStorage.token).user;
                if (localStorage.isLive && localStorage.isLive !== "false") {
                    user.is_live = localStorage.isLive
                }
                return user;
            }
        } catch(error) {
            return false;
        }
    },
    logout() {
        setAuth(null)
    }
}