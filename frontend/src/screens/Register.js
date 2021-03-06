import axios from 'axios';
import React, { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [email, setEamil] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [resMessage, setResMessage] = useState('');
  const [show, setShow] = useState(false);
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
      if (res.status === 210) {
        setResMessage(res.data.msg);
        setShow(true);
      }
      if (res.status === 202) {
        setResMessage("Password and Confirm Password don't match");
        setShow(true);
      }
      if (res.status === 201) {
        setResMessage('User alerady Exist!! Click on the Login link below.');
        setShow(true);
      }
    });
  };

  return (
    <div className='text-warning d-flex align-items-center justify-content-center flex-column container mt-2'>
      <h1 className='text-center mt-2'>STICKY NOTES</h1>

      <img
        className='mt-2'
        alt='logo'
        src='https://clickup.com/blog/wp-content/uploads/2020/01/note-taking.png'
        style={{ height: '200px', width: '250px' }}
      />

      <Alert
        show={show}
        className='mt-3 w-100 text-center'
        variant='danger'
        onClose={() => setShow(false)}
        dismissible
      >
        <Alert.Heading>{resMessage}</Alert.Heading>
      </Alert>
      <div className='w-75 mt-3'>
        <Form.Floating>
          <Form.Control
            id='floatingInputCustom'
            type='email'
            placeholder='name@example.com'
            value={email}
            onChange={(e) => setEamil(e.target.value)}
          />
          <label htmlFor='floatingInputCustom'>EMAIL ADDRESS</label>
        </Form.Floating>

        <Form.Floating>
          <Form.Control
            id='floatingInputCustom'
            type='text'
            placeholder='name'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <label htmlFor='floatingInputCustom'>FULL NAME</label>
        </Form.Floating>

        <Form.Floating>
          <Form.Control
            id='floatingInputCustom'
            type='text'
            placeholder='user name'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label htmlFor='floatingInputCustom'>USER NAME</label>
        </Form.Floating>

        <Form.Floating>
          <Form.Control
            id='floatingPasswordCustom'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor='floatingPasswordCustom'>PASSWORD</label>
        </Form.Floating>

        <Form.Floating>
          <Form.Control
            id='floatingPasswordCustom'
            type='password'
            placeholder='confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label htmlFor='floatingPasswordCustom'>CONFIRM PASSWORD</label>
        </Form.Floating>
      </div>

      <button className='btn btn-warning w-50 mt-3 mb-5' onClick={register}>
        REGISTER
      </button>

      <div className='d-flex align-items-center justify-content-center flex-column mb-5'>
        <h5 className='text-white'><strong>ALREADY A USER,  LOGIN NOW</strong></h5>{' '}
        <Link to='/' className='btn btn-success mt-2'>
          LOGIN
        </Link>
      </div>
    </div>
  );
};

export default Register;
