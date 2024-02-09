import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { verify_otp } from 'src/axios/Api';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Otp_password = () => {

  const location = useLocation();
  const { email } = location.state;

  const [otp, setOtp] = useState("")
  const [error, setError] = useState(null);


  const handle_change = (e)=>{
    setOtp(e.target.value)
  };

  const submit_fun = (e) => {
    e.preventDefault()
    verify_otp({email:email ,otp:otp}).then((response)=>{
      if (response.status === 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your OTP has been successfully verified.',
          showConfirmButton: false,
          timer: 1500,
        })
      } else if (response.status === 0) {
       setError("The OTP you provided is invalid. Please try again.");
      }
    })
  }

  return (
    <div>    
       <Form onSubmit={submit_fun}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email"  placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
      {/* <form onSubmit={submit_fun}>
        <div>
          <div>
            <div>
              <label htmlFor="email">Email</label>
            </div>
            <div>
              <input type="text" disabled value={email} />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="">Enter OTP</label>
            </div>
            <div>
              <input type="otp" name='otp' value={otp} onChange={handle_change}/>
            </div>
          </div>
          <div>
            <button type='submit'>Submit</button>
          </div>
        </div>
        {error && 
        <p>{error}</p>
        }
      </form> */}
    </div>
  )
};

export default Otp_password;