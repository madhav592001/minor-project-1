import axios from 'axios';
import React, { useState } from 'react';
import './AddNoteModal.css';
import { Alert } from 'react-bootstrap';

const AddNoteModal = (props) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [resMessage,setResMessage] = useState("") ;  
  const [show,setShow] = useState(false)

  const addNote = async (e) => {
    e.preventDefault();

    const config = {
      title: title,
      description: description,
    };

    const res = await axios.post('/addnote', config, {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('jwt_token'),
      },
    });

    console.log(res);

    if(res.status === 210){
        await setResMessage(res.data.msg)
        setShow(true) ;
    }

    if(res.status === 200){
        await setResMessage("YOUR NOTE HAS BEEN CREATED SUCCESSFULLY")
        setShow(true) ;
    }
  };

  return props.trigger ? (
    <div className='modal'>
      <div className='modalBox bg-primary'>

                
      <Alert show={show} className='mt-3' variant="info" onClose={() => setShow(false)} dismissible>
        <Alert.Heading className='text-center' >{resMessage}</Alert.Heading>
      </Alert>

        <button
          className='btn btn-danger px-2 py-1 float-end'
          onClick={async() => {
            await window.location.reload(false) ;
            props.setAddNoteModal(false) ;          
          }}
        >
          X
        </button>

        <hr />
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={7}
          ></textarea>
        </div>

        <button className='btn btn-success mt-3' onClick={addNote}>
          ADD NOTE
        </button>
      </div>
    </div>
  ) : (
    ''
  );
};




export default AddNoteModal;
