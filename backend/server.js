import express from 'express';
import { connectdb } from './db/connectdb.js';
import {userSignup} from './controllers/userSignup.js' ;
import { userSignin } from './controllers/userSignin.js';
import {authenticateToken} from './controllers/authenticateToken.js';
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config() ; 
const app = express() ; 
const port = process.env.PORT; 

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors('*')) ; 

connectdb() ; 

app.post('/signup',userSignup); 
app.post('/signin',userSignin) ; 
app.get('/isUserAuthenticated',authenticateToken,(req,res)=>{

    return res.status(200).json({
        auth:true,
        user:req.user,
        message:"you are authenticated"
    })
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});