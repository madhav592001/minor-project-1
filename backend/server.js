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
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors('*'));

connectdb();

app.get('/isauthenticated', authenticateToken);
app.get('/getuserdetails', authenticateToken, getUserDetails);
app.get('/notes', authenticateToken, getNotes);

app.post('/note', authenticateToken, getNoteById);
app.post('/signup', validateSignupRequest, isRequestValidated, userSignup);
app.post('/signin', validateSigninRequest, isRequestValidated, userSignin);
app.post(
  '/addnote',
  authenticateToken,
  validateAddNoteRequest,
  isRequestValidated,
  addNote
);

app.delete('/deletenote/', authenticateToken, deleteNote);

app.put('/updatenote/:id', authenticateToken, updateNote);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
