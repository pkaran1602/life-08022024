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
import { NavLink } from 'react-router-dom'
import style from './login.module.css'



const Login = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState({ email: "karan.patel@trilokninfotech.com", password: '12345678' })

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const loginFun = (e) => {
    e.preventDefault()
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
                      <CForm onSubmit={loginFun}>
                        <h2>Login</h2>
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
                        <CRow  >
                          <div className={style.reset_link}>
                            <NavLink to="/forget_password" >Forgot Password?</NavLink>
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
      </div>
    </>
  )
}

export default Login;
