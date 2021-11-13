import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import LoginPass from '../components/auth/LoginPass'
import SocialLogin from '../components/auth/SocialLogin'

const Login = () => {
    const navigate = useNavigate()

    const { auth } = useSelector((state) => state)

    useEffect(() => {
        if(auth.access_token) navigate('/')
    },[auth.access_token, navigate])


    return (
        <div className="auth_page">
            <div className="auth_box">
                <h3 className="text-uppercase text-center mb-4">Login</h3>

                <SocialLogin />

                <LoginPass />

                <small className="row my-2 text-primary" style={{cursor: 'pointer'}}>
                    <span className="col-6">
                        <Link to="/forgot_password">
                            Forgot password?
                        </Link>
                    </span>
                </small>

                <p>
                    You don't have an account? 
                    <Link to={`/register`} style={{color: 'crimson'}}>
                        Register Now
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default Login