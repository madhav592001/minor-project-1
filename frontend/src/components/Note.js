import axios from 'axios';
import React from 'react';

const Notes = ({ key, note }) => {

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
      console.log(res);
      window.location.reload(false);
    }
  };

  return (
    <div className='card text-white bg-primary mb-3'>
      <h4 class='card-header'>{note.title}</h4>
      <div class='card-body'>
        <p class='card-text'>{note.description}</p>
      </div>
      <button className='btn btn-danger' onClick={deleteNote}>
        Delete
      </button>
    </div>
  );
};

export default Notes;
