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
import { useSelector } from 'react-redux'
import { FaEyeSlash, FaEye } from "react-icons/fa";




const Login = () => {
  const { invalidCred } = useSelector((state) => state.userAuth);

  const dispatch = useDispatch()
  const [eye1, seteye1] = useState(true);
  const [errors, setErrors] = useState({});
  const [ptype1, setPtype1] = useState('password')
  const [loginAttempted, setLoginAttempted] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: ''
  })

  const show_password1 = () => {
    if (ptype1 === "password") {
      setPtype1("text");
      seteye1(false);
    }
    else {
      setPtype1("password");
      seteye1(true);
    }
  }

  const handleChange = (e) => {
    setLoginAttempted(false);
    validate(e.target.name, e.target.value)
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const validate = (name, value) => {
    switch (name) {
      case 'email':
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (value.length === 0) {
          // If email field is empty, do not show any error
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
      case 'password':
        if (value.length === 0) {
          // If password length is 0, remove all errors
          delete errors.password;
          setErrors(errors);
        }
        //  else if (value.length < 8) {
        //     setErrors({ ...errors, password: 'Password should be of minimum eight characters.' });
        //   }
        //   else if(value.length > 12){
        //     setErrors({ ...errors, password: 'Password should be of minimum twelve characters.' });
        //   }
        else {
          delete errors.password;
          setErrors(errors);
        }
        break
      default:
        break
    }
  }
  const validate_fun = async () => {
    let error = errors;
    if (user.email.length === 0) {
      error["email"] = "Email is required."
      setErrors({ ...errors, email: 'Please enter valid email address' });
    }
    if (user.password === "") {
      error["password"] = "Password is required."
      setErrors({ ...errors, password: 'Password should be of minimum eight characters.' });
    }
    return error;
  }
  const loginFun = async (e) => {
    e.preventDefault();
    const error = await validate_fun();
    setErrors(error);
    setLoginAttempted(true);
    if (Object.keys(error).length === 0) {
      dispatch(userLogin(user));
    }
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
                        <h2>Life Of Me</h2>
                        <img src={app_logo} />
                      </div>
                    </CCardBody>
                  </CCard>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm onSubmit={loginFun}>
                        <h4>Login</h4>
                        <p className="text-medium-emphasis">Sign In to your account</p>
                        <div className='mb-3'>
                          <CInputGroup  >
                            <CInputGroupText>
                              <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormInput
                              placeholder="Email"
                              name="email"
                              value={user.email}
                              onChange={handleChange}
                            // required
                            />
                          </CInputGroup>
                          {errors && errors.email && (
                            <p style={{ marginBottom: "0" }} className="text-danger">{errors.email}</p>
                          )}
                        </div>

                        <div className='mb-3'>
                          <CInputGroup  >
                            <CInputGroupText>
                              <CIcon icon={cilLockLocked} />
                            </CInputGroupText>
                            <CFormInput
                              placeholder="Password"
                              type={ptype1}
                              name="password"
                              value={user.password}
                              onChange={handleChange}
                              // required
                              style={{ }} // Adjust padding for the icon to fit
                            />
                            <div style={{ position: 'absolute', right: '10px', top: '50%',zIndex: '5', transform: 'translateY(-50%)' }}>
                              {eye1 ? (
                                <FaEyeSlash onClick={show_password1} />
                              ) : (
                                <FaEye onClick={show_password1} />
                              )}
                            </div>
                          </CInputGroup>
                          {errors && errors.password && (
                            <p style={{ marginBottom: "0" }} className="text-danger">{errors.password}</p>
                          )}
                        </div>
                        {loginAttempted && invalidCred && user.email && user.password && (// Render only if login attempted and invalid credentials
                          <CRow>
                            <p className='text-danger' style={{ display: 'flex', justifyContent: 'flex-start' }}>Invalid Email/Password</p>
                          </CRow>
                        )}
                        <CRow  >
                          <div className={style.reset_link}>
                            <NavLink style={{ color: "black" }} to="/forget_password" >Forgot Password?</NavLink>
                          </div>
                        </CRow>

                        <CRow>
                          <div className={style.my_btn}>
                            <button style={{ color: "black" }} type="submit">Login</button>
                          </div>
                        </CRow>
                        <br />
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





