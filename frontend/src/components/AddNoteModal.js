import axios from 'axios';
import React, { useState } from 'react';
import './AddNoteModal.css';

const AddNoteModal = (props) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [resMessage,setResMessage] = useState("") ;  

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
        setResMessage(res.data.msg)
    }

    if(res.status === 200){
        window.location.reload(false);
        props.setAddNoteModal(false) ; 
    }
  };

  return props.trigger ? (
    <div className='modal'>
      <div className='modalBox bg-primary'>
        <button
          className='btn btn-danger px-2 py-1 float-end'
          onClick={() => props.setAddNoteModal(false)}
        >
          X
        </button>

        <hr />
        <div className='form'>
          <h5 className='text-white'>Title of the Note</h5>
          <input
            type='text'
            class='form-control'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <h5 className='text-white mt-5'>Add Description to your Note</h5>
          <textarea
            className='form-control'
            id='exampleTextarea'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <h2 className='mt-3 text-danger text-center' >{resMessage.length !== 0 ? resMessage:""}</h2>

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
