import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import Note from '../components/Note.js';
import AddNoteModal from '../components/AddNoteModal.js';
import { Link } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState({});
  const [notes, setNotes] = useState([]);
  const [addNoteModal, setAddNoteModal] = useState(false);
  const [isauthenticated, setIsAuthenticated] = useState(false);

  // console.log(user)
  // console.log(notes)

  const logout = async () => {
    let res = await window.confirm('Are You sure you want to logout?');

    if (res === true) {
      await localStorage.removeItem('jwt_token');
    }

    window.location.reload(false) ;

  };

  useEffect(() => {

    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt_token'),
      },
    };

    axios.get('/getuserdetails', config).then(async (res) => {
      console.log(res.data.user);
      if (res.status === 200) {
        await setIsAuthenticated(true);
      }
      await setUser(res.data.user);
      await setNotes(res.data.user.notes);
    });

  }, []);

  return isauthenticated ? (
    <div className='text-white'>
      <div className='d-flex align-items-center justify-content-center mt-3'>
        <h1 className='text-center my-3'>Welcome {user.full_name}</h1>
        <button className='btn btn-info mx-5' onClick={logout}>
          LOGOUT
        </button>
      </div>

      <hr />
      <Container className=' d-flex flex-row align-items-center justify-content-center'>
        <h2 className='text-center'>Create a New Note</h2>
        <button
          className='btn btn-outline-warning mx-4'
          disabled={!isauthenticated}
          onClick={() => setAddNoteModal(true)}
        >
          Create
        </button>
      </Container>

      <AddNoteModal trigger={addNoteModal} setAddNoteModal={setAddNoteModal} />

      <hr />
      <Row className='mx-3 my-5'>
        {notes.map((note) => (
          <Col key={note._id} sm={12} md={6} xl={3}>
            <Note note={note} />
          </Col>
        ))}
      </Row>
    </div>
  ) : (
    <Container>
      <h2 className='text-white text-center mt-5'>
        YOU ARE NOT LOGGED IN!! LOGIN FIRST
      </h2>
      <div className='d-flex justify-content-center'>
        <Link to='/' className='btn btn-success mt-4'>
          LOGIN
        </Link>
      </div>
    </Container>
  );
};

export default Home;
