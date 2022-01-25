import express from 'express';
import { connectdb } from './db/connectdb.js';
import { userSignup } from './controllers/userSignup.js';
import { userSignin } from './controllers/userSignin.js';
import { authenticateToken } from './controllers/authenticateToken.js';
import { getUserDetails } from './controllers/getUserDetails.js';
import { addNote } from './controllers/addNote.js';
import { getNotes } from './controllers/getNotes.js';
import { deleteNote } from './controllers/deleteNote.js';
import dotenv from 'dotenv';
import cors from 'cors';
import {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
  validateAddNoteRequest,
} from './controllers/validators.js';
import { updateNote } from './controllers/updateNote.js';
import { getNoteById } from './controllers/getNoteById.js';

dotenv.config();
const app = express();
const router = express.Router() ;
const port = process.env.PORT;

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cors('*'));

connectdb() ;

router.get('/isauthenticated', authenticateToken);
router.get('/getuserdetails', authenticateToken, getUserDetails);
router.get('/notes', authenticateToken, getNotes);
router.get('/note/:id', authenticateToken, getNoteById);

router.post('/signup', validateSignupRequest, isRequestValidated, userSignup);
router.post('/signin', validateSigninRequest, isRequestValidated, userSignin);
router.post(
  '/addnote',
  authenticateToken,
  validateAddNoteRequest,
  isRequestValidated,
  addNote
);

router.delete('/deletenote/:id', authenticateToken, deleteNote);

router.put('/updatenote/:id', authenticateToken, updateNote);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
