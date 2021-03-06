import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const Notes = ({ note }) => {

  const deleteNote = async () => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt_token'),
      },
    };

    console.log(note._id);

    let result = await window.confirm(
      'Are you sure you want to delete this Note?'
    );

    if (result === true) {
      const res = await axios.delete(`/deletenote/${note._id}`, config);
      window.location.reload(false) ;
      console.log(res); 
    }
  };

  return (
    <div className='card text-white bg-primary mb-3'>
      <h3 className='card-header'><strong>{note.title}</strong></h3>
      <div className='card-body text-white'>
        <p className='card-text' style={{fontSize:"20px"}} >{note.description}</p>
      </div>

      <div className='w-100' >
        <button className='btn btn-danger w-50' onClick={deleteNote}>
          Delete
        </button>
        <Link to={`/updatenote/${note._id}`} className='btn btn-success w-50'  >
          Update
        </Link>
      </div>
    </div>
  );
};

export default Notes;
