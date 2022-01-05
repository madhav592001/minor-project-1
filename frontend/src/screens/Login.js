import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resStatus,setResStatus] = useState() ; 

  const login = async(e) => {
    e.preventDefault() ;
    // console.log(email+"+"+password);

    const res = await axios.post('/signin', {
      email:email,
      password:password
    })

    setResStatus((resStatus)=>setResStatus(res.status))
    
    if(res.status === 200){
      localStorage.setItem("jwt_token",res.data.jwt_token) ; 
      navigate("/home") ;
    }

  };

  return (
    <Container className='text-light d-flex justify-content-center flex-column align-items-center'>
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

          <h2 className='my-2 text-danger'>{resStatus===201?"Wrong email/password!!":""}</h2>

          <h2 className='my-2 text-danger'>{resStatus===202?"You are not Registered!! Click on the link below":""}</h2>

          <h5 className='text-success'>Not Registered? Signup for Sticky Notes</h5>
          <Link to='/registeruser' className='btn btn-info w-25 mb-5'>
            Signup
          </Link>
        </Form.Group>
      </Form>
    </Container>
  );
};
export default Login;
