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
import { cilLockLocked, cilUser } from '@coreui/icons'
import app_logo from '../../assets/brand/logo.png'
import { useDispatch } from 'react-redux'
import { userLogin } from 'src/redux/actions/authAction'
import { NavLink, useNavigate } from 'react-router-dom'
import style from './login.module.css'
import { LOGIN_FAILED } from 'src/messages/Error_message'


const Login = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState({ email: "karan.patel@trilokninfotech.com", password: '123456' })

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const loginFun = (e) => {
    e.preventDefault()
    // alert(LOGIN_FAILED)  
    dispatch(userLogin(user))
  }

  return (
    <>
    <div className={style.login_form}>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={8}>
                
              <CCardGroup>
                  
                    <CCard className="text-white bg-primary py-5">
                
                      <CCardBody className="text-center">
                        <div className={style.my_logo}>
                          <h2>Life of Me</h2>
                          <img src={app_logo} />
                        </div>
                      </CCardBody>
                  
                    </CCard>
               
             
                    <CCard className="p-4">
                      <CCardBody>
                 
                        <CForm onSubmit={loginFun}>
                          <h1>Login</h1>
                          <p className="text-medium-emphasis">Sign In to your account</p>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormInput
                              placeholder="Email"
                              name="email"
                              value={user.email}
                              onChange={handleChange}
                              required
                            />
                          </CInputGroup>
                          <CInputGroup className="mb-4">
                            <CInputGroupText>
                              <CIcon icon={cilLockLocked} />
                            </CInputGroupText>
                            <CFormInput
                              placeholder="Password"
                              type="password"
                              name="password"
                              value={user.password}
                              onChange={handleChange}
                              required
                            />
                          </CInputGroup>
                          <CRow>
                            <div className={style.my_btn}>
                              <button type="submit">Login</button>
                            </div>
                          </CRow>
                          <br />
                          <CRow className="text-center">
                            <NavLink to="/forget_password">Forgot Password</NavLink>
                          </CRow>
                        </CForm>
                       
                      </CCardBody>
                    </CCard>
                
              </CCardGroup>
      
            </CCol>
          </CRow>
        </CContainer>
      </div>
      </div>
    </>
  )
}

export default Login
