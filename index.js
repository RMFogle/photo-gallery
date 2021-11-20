import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express'; 
import mongoose from 'mongoose'; 
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import routes from "./server/routes/index.js"


const app = express();
app.use(express.json({ limit: "30mb", extended: true })); 
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors({
    origin: `${process.env.BASE_URL}`,
    credentials: true,
}));
app.use(morgan('dev'))
app.use(cookieParser())

const loginOptions = {
    origin: true,
    methods: ["POST"],
    credentials: true,
    maxAge: 3600,
    preflightContinue: true,
}
app.options('/api/google_login', cors(loginOptions))
app.post('/api/google_login', cors(loginOptions), function (req, res, next) {
    res.json({msg: 'This is CORS-enables for google login'})
})

const refreshTokenCors = {
    origin: true,
    methods: ["GET"],
    credentials: true,
    maxAge: 3600,
    preflightContinue: true,
}
app.options('/api/refresh_token', cors(refreshTokenCors))
app.get('/api/refresh_token', cors(refreshTokenCors), function (req, res, next) {
    res.json({msg: 'This is CORS-enables for refresh token'})
})

const loginUser = {
    origin: true,
    methods: ["POST"],
    credentials: true,
    maxAge: 3600,
    preflightContinue: true,
}
app.options('/api/login', cors(loginUser))
app.get('/api/login', cors(loginUser), function (req, res, next) {
    res.json({msg: 'This is CORS-enables for login'})
})


app.use('/api', routes.authRouter)
app.use('/api', routes.photosRouter)
app.get('/', (req, res) => {
    res.json({
        msg: 'Welcome',
        'photo-gallery-api': 'https://sad-mestorf-f1ac6b.netlify.app'
    })
})

const port = process.env.PORT || 5000; 

//Connect to mongodb cloud atlas 
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
); 
const connection = mongoose.connection; 
connection.once('open', () => {
    console.log("MongoDB database connection established successfully"); 
})


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`); 
});