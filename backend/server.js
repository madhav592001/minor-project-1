import express from 'express';
import { connectdb } from './db/connectdb.js';
import {userSignup} from './controllers/userSignup.js' ;
import { userSignin } from './controllers/userSignin.js';
import {authenticateToken} from './controllers/authenticateToken.js';
import { getUserDetails } from './controllers/getUserDetails.js';
import {addNote} from './controllers/addNote.js';
import { getNotes } from './controllers/getNotes.js';
import dotenv from 'dotenv'
import cors from 'cors'
import {validateSignupRequest,isRequestValidated, validateSigninRequest} from './controllers/validators.js' ; 

dotenv.config() ; 
const app = express() ; 
const port = process.env.PORT; 

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors('*')) ; 

connectdb() ; 

app.post('/signup',validateSignupRequest,isRequestValidated,userSignup); 
app.post('/signin',validateSigninRequest,isRequestValidated,userSignin) ; 
app.get('/getuserdetails',authenticateToken,getUserDetails) ; 
app.post('/addnote',authenticateToken,addNote); 
app.get('/notes',authenticateToken,getNotes);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});