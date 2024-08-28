import React, { useState, useContext } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import { AuthContext } from '../../AuthContext'; // Adjust path if necessary
import { useNavigate } from 'react-router-dom'; // Import useNavigate
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useContext(AuthContext);
const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      setMessage('Login successful');
      navigate('/home');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };
  const handleSignUp = () => {
    navigate('/signup'); // Navigate to the signup page
  };


  return (
    <MDBContainer fluid style={{ paddingTop: '80px' }}>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
              <h2 className="fw-bold mb-2 text-center">Sign in</h2>
              <p className="text-white-50 mb-3 text-center">Please enter your login and password!</p>

              <form onSubmit={handleLogin}>
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
                  label='Password'
                  id='passwordInput'
                  type='password'
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <MDBCheckbox
                  name='flexCheck'
                  id='flexCheckDefault'
                  className='mb-4'
                  label='Remember password'
                />

                <MDBBtn size='lg' type='submit' style={{ backgroundColor: '#dd4b39' }}>
                  Login
                </MDBBtn>

                {message && <p className="text-center mt-3">{message}</p>}

                <hr className="my-4" />

                {/* <MDBBtn className="mb-2 w-100" size="lg" style={{ backgroundColor: '#dd4b39' }}>
                  <MDBIcon fab icon="google" className="mx-2"/>
                  Sign Up
                </MDBBtn> */}

                <MDBBtn className="mb-2 w-100" size="lg" style={{ backgroundColor: '#3b5998' }} onClick={handleSignUp}>
                  <MDBIcon fab icon="facebook-f" className="mx-2"/>
                  Sign Up
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;