import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';
import axios from 'axios'; // You might need to install axios if you haven't already

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role
  const [message, setMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/api/auth/signup', {
        username,
        email,
        password,
        // role: [role] // Send role as an array
      });
      setMessage('Sign up successful');
      navigate('/home');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Sign up successful');
    }
  };

  return (
    <MDBContainer fluid style={{ paddingTop: '80px' }}>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
              <h2 className="fw-bold mb-2 text-center">Sign Up</h2>
              <p className="text-white-50 mb-3 text-center">Create your account!</p>

              <form onSubmit={handleSignUp}>
                <MDBInput
                  wrapperClass='mb-4 w-100'
                  label='Username'
                  id='usernameInput'
                  type='text'
                  size="lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass='mb-4 w-100'
                  label='Email'
                  id='emailInput'
                  type='email'
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass='mb-4 w-100'
                  label='Password'
                  id='passwordInput'
                  type='password'
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                

                <MDBBtn size='lg' type='submit' style={{ backgroundColor: '#dd4b39' }}>
                  Sign Up
                </MDBBtn>

                {message && <p className="text-center mt-3">{message}</p>}
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default SignUp;