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
  const [verify_error, setVerify_error] = useState(null);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});



  const handleChange = (e) => {
    setEmail(e.target.value)
    validate(e.target.name, e.target.value)
  };

  const handleChange1 = (e) => {
    setOtp(e.target.value)
    validate(e.target.name, e.target.value)
    if(e.target.value === ""){
      setVerify_error("OTP is required");
    }
  };

  const validate = (name, value) => {
    switch (name) {
      case 'email':
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (value.length === 0) {

          delete errors.email;
          setErrors(errors);
        }
       else if (!value.match(validRegex)) {
          setErrors({
            ...errors,
            email: 'Please enter valid email address',
          })
        }
         else {
          delete errors.email
          setErrors(errors)
        }
        break
          default:
            break
    }
  }
  const validate_fun =async ()=>{
    let error = errors;
    if(email.length === 0){
      error["email"] ="Email is required."
      setErrors({ ...errors, email: 'Please enter valid email address' });
    }
    return error;
  }
  const submitFun =async (e) => {
    e.preventDefault();
    const error = await validate_fun();
    setErrors(error);
    if(Object.keys(errors).length ===0){
    forgot_pass({ email: email }).then((res) => {
      if (res.status === 1) {
        Swal.fire({
          position: "center",
          icon: "success",
          text:"OTP has been sent to your email",
          showConfirmButton: false,
          timer: 4000
        });
        setIsOpen(true);
      }
       else if (res.status === 0) {
        setErrors({
          ...errors,
          email: res.message,
        })
      }
    });
  };
}
  const closeFun = () => {
    setIsOpen(false);
    setVerify_error(null);
    setOtp('');
  };

  const resend_otp = ()=>{
    forgot_pass({ email: email }).then((res) => {
      console.log(res)
      if (res.status === 1) {
        Swal.fire({
          position: "center",
          icon: "success",
          text:"OTP has been resent to your email",
          showConfirmButton: false,
          timer: 4000
        });
        setIsOpen(true);
      }
       else if (res.status === 0) {
        setErrors({
          ...errors,
          email: res.message,
        })
      }
    })
  }
      
    


  const verifyFun =  (e) => {
    e.preventDefault();
    if(otp === ""){
      setVerify_error("OTP is required")
    } else{
    verify_otp({ email: email, otp: otp }).then((response) => {
      if (response.status === 1) {
        dispatch(reset_request_Fun())
        navigate('/reset_password', { state: { email: email } });
      }
       else if (response.status === 0) {
        setVerify_error(response.message);
       console.log(response.message);
      }
    })
  }
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
                        <h2>Life Of Me</h2>
                        <img src={app_logo} />
                      </div>
                    </CCardBody>
                  </CCard>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm onSubmit={submitFun}>
                        <h4>Reset Password</h4>
                        <p className="text-medium-emphasis">A one-time-password(OTP)will be sent to your registered email address for verification</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            // required
                          />
                        </CInputGroup>
                        {errors && errors.email && (
                        <p className="text-danger">{errors.email}</p>
                      )}
                        <CRow>
                          <div className={style.my_btn}>
                            <button type="submit">Send OTP</button>
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
          handleChange1={handleChange1}
          resend_otp={resend_otp}
        />
      </div>
    </>
  )
}
export default Forgot_pass;
