import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser } from '@coreui/icons'
import app_logo from '../../../assets/brand/logo.png'
import style from './forgot_pass.module.css'
import { useNavigate } from 'react-router-dom';
import { forgot_pass, verify_otp } from 'src/axios/Api'
import Verify_otp from './Verify_otp'
import { useDispatch } from 'react-redux'
import { reset_request_Fun } from 'src/redux/actions/authAction'
import Swal from 'sweetalert2'



const Forgot_pass = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [verify_error, setVerify_error] = useState(null);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
   
    let email_text = e.target.value;
    setEmail(email_text);
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email_text.match(validRegex)) {
      setError('Please enter a valid email.');
    } else {
      setError(null);
    }
  };
  const submitFun = (e) => {
    e.preventDefault();
    forgot_pass({ email: email }).then((res) => {
      if (res.status === 1) {
        Swal.fire({
          position: "center",
          icon: "success",
          text:"OTP has been sent to your email",
          showConfirmButton: false,
          timer: 2000
        });
        setIsOpen(true);
      } else if (res.status === 0) {
        setError(res.message);
      }
    });
  };
  const closeFun = () => {
    setIsOpen(false);
    setVerify_error(null);
    setOtp('');
  };

  const verifyFun = (e) => {
    e.preventDefault();
    verify_otp({ email: email, otp: otp }).then((response) => {
      if (response.status === 1) {
        dispatch(reset_request_Fun())
        navigate('/reset_password', { state: { email: email } });
      } else if (response.status === 0) {
        setVerify_error(response.message);
       console.log(response.message);
      }
    })
  };

 

  return (
    <>
      <div className={style.login_form}>
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md={8}>
                <CCardGroup>
                  <CCard className={style.left_div}>
                    <CCardBody className="text-center">
                      <div className={style.my_logo}>
                        <h2>Life of Me</h2>
                        <img src={app_logo} />
                      </div>
                    </CCardBody>
                  </CCard>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm onSubmit={submitFun}>
                        <h3>Reset password</h3>
                        <p className="text-medium-emphasis">Enter your email to reset password</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            required
                          />
                        </CInputGroup>
                        {error &&
                          <p className='text-danger'>{error}</p>
                        }
                        <CRow>
                          <div className={style.my_btn}>
                            <button type="submit">Submit</button>
                          </div>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
        </div>
        <Verify_otp
          isOpen={isOpen}
          closeFun={closeFun}
          otp={otp}
          setOtp={setOtp}
          verifyFun={verifyFun}
          verify_error={verify_error}
        />
      </div>
    </>
  )
}
export default Forgot_pass;
