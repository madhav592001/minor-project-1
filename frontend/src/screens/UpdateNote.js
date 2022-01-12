import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const UpdateNote = ({ match }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [show, setShow] = useState(false);

  const { id } = useParams();

  useEffect(() => {

    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt_token'),
      },
    };
    
    axios.get(`/note/${id}`, config).then(async (res) => {
      // console.log(res.data.note) ;
      await setTitle(res.data.note.title);
      await setDescription(res.data.note.description);
    });
  }, []);

  const update = (e) => {
    e.preventDefault();

    const config = {
      title: title,
      description: description,
    };

    axios
      .put(`/updatenote/${id}`, config, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('jwt_token'),
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setShow(true);
        }
      });
  };

  return (
    <Container>
      <Alert
        show={show}
        className='mt-3 text-center'
        variant='success'
        onClose={() => setShow(false)}
        dismissible
      >
        <Alert.Heading>YOUR NOTE HAS BEEN UPDATED SUCCESSFULLY!!</Alert.Heading>
      </Alert>

      <h1 className='text-center my-5 text-white'>
        {' '}
        <b>UPDATE YOUR NOTE </b>{' '}
      </h1>

      <Link to='/home' className='btn btn-danger px-2 py-1 mb-5'>
        Back
      </Link>

      <div className='form'>
        <h5 className='text-white'>Title of the Note</h5>
        <input
          type='text'
          className='form-control'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h5 className='text-white mt-5'>Add Description to your Note</h5>
        <textarea
          className='form-control'
          id='exampleTextarea'
          rows={7}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button className='btn btn-info mt-3' onClick={update}>
          {' '}
          Save Changes{' '}
        </button>
      </div>
    </Container>
  );
};

export default UpdateNote;
