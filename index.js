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
    origin: 'https://sad-mestorf-f1ac6b.netlify.app',
})); 
app.use(morgan('dev'))
app.use(cookieParser())

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://sad-mestorf-f1ac6b.netlify.app');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
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