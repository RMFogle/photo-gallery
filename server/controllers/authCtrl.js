import Users from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateActiveToken, generateAccessToken, generateRefreshToken } from '../config/generateToken.js'
import sendMail from '../config/sendMail.js'
import { validEmail } from '../middleware/valid.js'

import { OAuth2Client } from 'google-auth-library'

const client = new OAuth2Client(`${process.env.MAIL_CLIENT_ID}`)
const CLIENT_URL = `${process.env.BASE_URL}`

const authCtrl = {
    register: async(req, res) => {
        try {
            const { name, account, password } = req.body 

            const user = await Users.findOne({account})
            if(user) return res.status(400).json({msg: 'Email already exists.'})

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = { name, account, password: passwordHash }

            const active_token = generateActiveToken({newUser})

            const url = `${CLIENT_URL}/active/${active_token}`

            if(validEmail(account)){
                sendMail(account, url, "Verify your email address")
                return res.json({msg: "Success! Please check your email." })

            }
        
        } catch (err) {
            return res.status(500).json({msg: err.message})
    }
}, 
    activeAccount: async(req, res) => {
        try { 
            const { active_token } = req.body

            const decoded = jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)

            const { newUser } = decoded

            if(!newUser) return res.status(400).json({msg: "Invalid authentication."})

            const user = await Users.findOne({account: newUser.account})
            if(user) return res.status(400).json({msg: "Account already exists."})

            const new_user = new Users(newUser)

            await new_user.save()

            res.json({msg: "Account has been activated"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    login: async(req, res) => {
        try { 
            const { account, password } = req.body
            
            const user = await Users.findOne({account})
            if(!user) return res.status(400).json({msg: 'This account does not exits'})

            loginUser(user, password, res)

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    logout: async(req, res) => {
        if(!req.user)
        return res.status(400).json({msg: 'Invalid Authentication.'})

        try {
            res.clearCookie('refreshtoken', { path: `/api/refresh_token` })

            await Users.findOneAndUpdate({_id: req.user._id}, {
                rf_token: ''
            })

            return res.json({msg: "Logged out!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    refreshToken: async(req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if(!rf_token) return res.status(400).json({msg: "Please login now"})

            const decoded = jwt.verify(rf_token, id, `${process.env.REFRESH_TOKEN_SECRET}`)
            if(!decoded.id) return res.status(400).json({msg: "Please login now"})

            const user = await Users.findById(decoded.id).select("-password +rf_token")
            if(!user) return res.status(400).json({msg: "This account does not exist"})

            if(rf_token !==user.rf_token)
                return res.status(400).json({msg: "Please login now!"})

            const access_token = generateAccessToken({id: user._id})
            const refresh_token = generateRefreshToken({id: user._id}, res)

            await Users.findOneAndUpdate({_id: user._id}, {
                rf_token: refresh_token
            })

            res.json({ access_token, user })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    googleLogin: async(req, res) => {
        try {
            const { id_token } = req.body
            const verify = await client.verifyIdToken({
                idToken: id_token, audience: `${process.env.MAIL_CLIENT_ID}`
            })

            const {
                email, email_verified, name, picture
            } = verify.getPayload()

            if(!email_verified)
            return res.status(500).json({msg: "Email verification failed."})

            const password = email + 'your google secret password'
            const passwordHash = await bcrypt.hash(password, 12)

            const user = await Users.findOne({account: email})

            if(user){
                loginUser(user, password, res)
            }else{
                const user = {
                    name,
                    account: email, 
                    password: passwordHash, 
                    avatar: picture,
                    type: 'google'
                }
                registerUser(user, res)
            }
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}

const loginUser = async (user, password, res) => {
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

    const access_token = generateAccessToken({id: user._id})
    const refresh_token = generateRefreshToken({id: user._id})

    await Users.findOneAndUpdate({_id: user._id}, {
        rf_token:refresh_token
    })

    res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: `/api/refresh_token`,
        maxAge: 30*24*60*60*1000
    })

    res.json({
        msg: 'Login Success',
        access_token,
        user: { ...user._doc, password: '' }
    })

}

const registerUser = async (user, res) => {
    const newUser = new Users(user)

    const access_token = generateAccessToken({id: newUser._id})
    const refresh_token = generateRefreshToken({id: newUser._id})

    newUser.rf_token = refresh_token
    await newUser.save()

    res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: `/api/refresh_token`,
        maxAge: 30*24*60*60*1000
    })

    res.json({
        msg: 'Login Success',
        access_token,
        user: { ...newUser._doc, password: '' }
    })
}

export default authCtrl;