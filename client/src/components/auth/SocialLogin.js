import { useDispatch } from "react-redux";
import { GoogleLogin } from 'react-google-login-lite';

import { googleLogin } from '../../actions/auth'

const SocialLogin = () => {
    const dispatch = useDispatch()

    const onSuccess = (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token
        dispatch(googleLogin(id_token))
    }

    return (
        <div className="my-2">
            <GoogleLogin 
            client_id='651220310437-s0ob4dv6dk9m4r05i00o230b48es9hll.apps.googleusercontent.com'
            cookiepolicy='single_host_origin'
            onSuccess={onSuccess}
            />
        </div>
    )
}

export default SocialLogin