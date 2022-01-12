import React, { useState } from 'react';
import { Container, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resMessage, setResMessage] = useState('');
  const [show, setShow] = useState(false);

  // useEffect(() => {

  //   const config = {
  //     headers: {
  //       authorization: "Bearer "+localStorage.getItem('jwt_token'),
  //     },
  //   };
  //   const res = axios.get("/isauthenticatd",config) ;

  //   if(res.status !== 401 && res.status !==403 ){
  //     navigate("/home") ;
  //   }

  // }, [])

  const login = async (e) => {
    e.preventDefault();
    // console.log(email+"+"+password);

    const res = await axios.post('/signin', {
      email: email,
      password: password,
    });

    console.log(res);

    if (res.status === 210) {
      await setResMessage(res.data.msg);
      setShow(true);
    }

    if(res.status === 201){
      await setResMessage("WRONG PASSWORD!! PLEASE TRY AGAIN")
      setShow(true) ;
    }

    if(res.status === 202){
      await setResMessage("NOT REGISTERED!! REGISTER USING THE LINK BELOW") ;
      setShow(true) ;
    }

    if (res.status === 200) {
      localStorage.setItem('jwt_token', res.data.jwt_token);
      navigate('/home');
    }
  };

  return (
    <Container className='text-light d-flex justify-content-center flex-column align-items-center'>
      <Alert
        show={show}
        className='mt-3 w-100 text-center'
        variant='danger'
        onClose={() => setShow(false)}
        dismissible
      >
        <Alert.Heading>{resMessage}</Alert.Heading>
      </Alert>

      <h1 className='text-center mt-4'>Sticky Notes</h1>
      <img
        className='mt-5'
        alt='logo'
        src='https://clickup.com/blog/wp-content/uploads/2020/01/note-taking.png'
        style={{ height: '200px', width: '250px' }}
      />

      <h1 className='text-center mt-4'>Login</h1>

      <Form className='text-warning d-flex flex-column mt-5 w-75'>
        <Form.Floating>
          <Form.Control
            id='floatingInputCustom'
            type='email'
            placeholder='name@example.com'
            className='mb-1'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor='floatingInputCustom'>Email address</label>
        </Form.Floating>

        <Form.Floating>
          <Form.Control
            id='floatingPasswordCustom'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor='floatingPasswordCustom'>Password</label>
        </Form.Floating>

        <Form.Group className='d-flex justify-content-center align-items-center flex-column w-100 mt-3'>
          <button className='btn btn-info w-25' onClick={login}>
            Login
          </button>

          <h5 className='text-success'>
            Not Registered? Signup for Sticky Notes
          </h5>
          <Link to='/registeruser' className='btn btn-info w-25 mb-5'>
            Signup
          </Link>
        </Form.Group>
      </Form>
    </Container>
  );
};
export default Login;
