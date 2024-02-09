import React, { useState } from 'react'
import style from './forgot_pass.module.css'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { CCard, CCardBody, CCardGroup, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser } from '@coreui/icons'
import app_logo from '../../../assets/brand/logo.png'
import { forgot_pass } from 'src/axios/Api'

const Forgot_pass = () => {
  const navigate = useNavigate()

  const [errors, setErrors] = useState({})
  const [email, setEmail] = useState("")

  const handleChange = (e) => {
    validate(e.target.name, e.target.value)
    setEmail(e.target.value)
  }

  const validate = (name, value) => {
    switch (name) {
      case "email":
        var validRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!value.match(validRegex)) {
          setErrors({
            ...errors,
            email: "Please enter a valid email !",
          });
        } else {
          delete errors.email;
          setErrors(errors);
        }
        break;
      default:
        break;
    }
  }


  const submit_fun = (e) => {
    e.preventDefault()
    forgot_pass({ email: email }).then((res) => {
      if (res.status === 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Email has been sent to your registered email address',
          showConfirmButton: false,
          timer: 1500,
        })
        navigate('/otp_password', {state:{email: email}});
      }
    })
  };

  return (
    <div className={style.login_form}>
      <div className="bg-light min-vh-100  d-flex flex-row align-items-center">
        <CContainer>
          <div className={style.main_container} >
            <CCardGroup>
              <CCard className="text-white bg-primary py-1"  >
                <CCardBody className="text-center">
                  <div>
                    <h2>Life of Me</h2>
                    <img src={app_logo} width='100px' />
                  </div>
                  <CForm onSubmit={submit_fun}>
                    <h2>Forgot Password ?</h2>
                    <br />
                    <p className="text-white">Enter Your Email to get a link to reset your Password</p>
                    <br />
                    <div className={style.my_input} >
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput placeholder="Email"
                          type="text" name="email" value={email} onChange={handleChange} required
                        />
                      </CInputGroup>
                    </div>
                    <CRow>
                      <div className={style.my_btn} style={{ display: 'flex', justifyContent: 'center', }}>
                        <button type='submit' >Send</button>
                      </div>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </div>
        </CContainer>
      </div>
    </div>
  )
};

export default Forgot_pass;
