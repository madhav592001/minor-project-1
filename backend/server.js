import express from 'express';
import { connectdb } from './db/connectdb.js';
import {userSignup,userSignin,authenticateToken} from './controllers/auth.js'
import dotenv from 'dotenv'

dotenv.config() ; 
const app = express() ; 
const port = process.env.port; 

app.use(express.json());
app.use(express.urlencoded({extended:true}));

connectdb() ; 

app.post('/signup',userSignup); 
app.post('/signin',userSignin) ; 

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});