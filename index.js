import express from 'express'; 
import mongoose from 'mongoose'; 
import cors from 'cors';
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';

import routes from "./server/routes/index.js"

dotenv.config(); 

const app = express();
const port = process.env.PORT || 5000; 

app.use(express.json({ limit: "30mb", extended: true })); 
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors()); 
app.use(cookieParser())


// app.use(express.static(path.join(__dirname, '..', 'build')));
app.use('/api', routes.authRouter)
app.use('/api', routes.photosRouter)

//Connect to mongodb cloud atlas 
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
); 
const connection = mongoose.connection; 
connection.once('open', () => {
    console.log("MongoDB database connection established successfully"); 
})

// mongoose.set('useFindAndModify', false); 

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`); 
});