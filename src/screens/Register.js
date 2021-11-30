import axios from 'axios';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEamil] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  let navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();

    const config = {
      email: email,
      password: password,
      confirm_password: confirmPassword,
      full_name: fullName,
      user_name: userName,
    };

    axios.post('/signup', config).then((res) => {
      console.log(res);
      if (res.status === 200) {
        navigate('/');
      }
    });
  };

  return (
    <div className='text-warning d-flex align-items-center justify-content-center flex-column container mt-2'>
      <h1 className='text-center mt-2'>Sticky Notes</h1>

      <img
        className='mt-5'
        alt='logo'
        src='https://clickup.com/blog/wp-content/uploads/2020/01/note-taking.png'
        style={{ height: '200px', width: '250px' }}
      />

      <div className='w-50 mt-5'>
        <Form.Floating>
          <Form.Control
            id='floatingInputCustom'
            type='email'
            placeholder='name@example.com'
            value={email}
            onChange={(e) => setEamil(e.target.value)}
          />
          <label htmlFor='floatingInputCustom'>Email address</label>
        </Form.Floating>

        <Form.Floating>
          <Form.Control
            id='floatingInputCustom'
            type='text'
            placeholder='name'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <label htmlFor='floatingInputCustom'>Full Name</label>
        </Form.Floating>

        <Form.Floating>
          <Form.Control
            id='floatingInputCustom'
            type='text'
            placeholder='user name'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label htmlFor='floatingInputCustom'>User Name</label>
        </Form.Floating>

        <Form.Floating>
          <Form.Control
            id='floatingPasswordCustom'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor='floatingPasswordCustom'>Password</label>
        </Form.Floating>

        <Form.Floating>
          <Form.Control
            id='floatingPasswordCustom'
            type='password'
            placeholder='confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label htmlFor='floatingPasswordCustom'>Confirm password</label>
        </Form.Floating>
      </div>

      <button className='btn btn-warning w-50 mt-3 mb-5' onClick={register}>
        Register
      </button>
    </div>
  );
};

export default Register;
