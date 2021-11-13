import { useDispatch } from "react-redux";
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login-lite';

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
            client_id='244836444188-fnf2rsmeikroefsuah6o8b1uovjsve4j.apps.googleusercontent.com'
            cookiepolicy='single_host_origin'
            onSuccess={onSuccess}
            />
        </div>
    )
}

export default SocialLogin