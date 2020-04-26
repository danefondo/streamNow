import jwtDecode from 'jwt-decode';
import { setAuth } from './axios';
export default {
    isAuthenticated() {
        try {
            if (localStorage.token && jwtDecode(localStorage.token)) {
                // check expiry
                const user = jwtDecode(localStorage.token).user;
                user.is_live = localStorage.isLive
                user.active_stream_id = localStorage.active_stream_id
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