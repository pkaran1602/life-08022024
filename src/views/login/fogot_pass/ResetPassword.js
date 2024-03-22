import React, { useEffect, useState } from 'react'
import style from './resetpassword.module.css'
import { Col, Row } from 'react-bootstrap'
import profile from '../../../assets/brand/logo.png'
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'
import Card from 'react-bootstrap/Card'
import { useLocation, useNavigate } from 'react-router-dom'
import { reset_Password } from 'src/axios/Api'
import { useDispatch } from 'react-redux'
import { reset_success_Fun } from 'src/redux/actions/authAction'
import My_Loader from 'src/components/loader/My_Loader'
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
import { FaEyeSlash ,FaEye } from "react-icons/fa";


// const ResetPassword = () => {

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [isLoading, setIsLoading] = useState(true);
//   const [errors, setErrors] = useState({})
//   const [error2, setError2] = useState(false)
//   const [ptype, setPtype] = useState('password')
//   const [eye1, seteye1] = useState(true);
//   const [eye2, seteye2] = useState(true);
//   const [ptype1, setPtype1] = useState('password')
//   const [ptype2, setPtype2] = useState('password')

//   const { state } = useLocation();
//   if (state === null) {
//     navigate('/login');
//   }
//   const [data, setData] = useState({
//     email: state.email,
//     password: '',
//     confirm_password: ''
//   });

//   const submit_fun = async (e) => {
//     e.preventDefault();
//     const error = await validate_fun();
//     setErrors(error);
//     if (Object.keys(errors).length === 0) {
//       reset_Password(data).then((res) => {
//         console.log(res)
//         setIsLoading(false);
//         if (res.status === 1) {
//           Swal.fire({
//             position: "center",
//             icon: "success",
//             text: "Password has been created successfully",
//             showConfirmButton: false,
//             timer: 2000
//           });
//           dispatch(reset_success_Fun());
//         }
//       })
//     } else {

//     }
//   };
//   const handleChange = (e) => {
//     validate(e.target.name, e.target.value)
//     setData({ ...data, [e.target.name]: e.target.value });
//   };
//   const validate = (name, value) => {
//     switch (name) {
//       case 'password':
//         if (value.length < 8) {
//           setErrors({ ...errors, password: 'Password should be of minimum eight characters.' });
//         }
//         else if (value.length > 12) {
//           setErrors({ ...errors, password: 'Password should be of minimum twelve characters.' });
//         } else {
//           delete errors.password;
//           setErrors(errors);
//         }
//         break
//       case 'confirm_password':
//         if (value.length < 8) {
//           setErrors({ ...errors, confirm_password: 'Password should be of minimum eight characters.' });
//         }
//         else if (value.length > 12) {
//           setErrors({ ...errors, confirm_password: 'Password should be of minimum twelve characters.' });
//         }
//         else {
//           delete errors.confirm_password;
//           setErrors(errors);
//         }
//         break
//     }
//   }
//   const validate_fun = async () => {
//     let error = errors;
//     if (data.password === "") {
//       error["password"] = "Password is required."
//       setErrors({ ...errors, password: 'Password should be of minimum eight characters.' });
//     }
//     if (data.confirm_password.length === 0) {
//       error["confirm_password"] = "Confirm Password is required."
//       setErrors({ ...errors, confirm_password: 'Password should be of minimum eight characters.' });
//     }
//     console.log(error)
//     return error;
//   }

//   const show_password1 = ()=>{
//     if (ptype1 === "password") {
//       setPtype1("text");
//       seteye1(false);
//     }
//     else {
//       setPtype1("password");
//       seteye1(true);
//     }
//   }
//   const show_password2 = ()=>{
//     if (ptype2 === "password") {
//       setPtype2("text");
//       seteye2(false);
//     }
//     else {
//       setPtype2("password");
//       seteye2(true);
//     }
//   }

//   useEffect(() => {
//    setTimeout(()=>{
//     setIsLoading(false);
//    }, 2000)
//   }, [])
  

//   return (
//     <div>
//       {isLoading &&
//         <My_Loader />
//       }
//       {!isLoading &&
//         <div className={stylesheet.container}>
//           <Card className={stylesheet.card}>
//             <Card.Header className={stylesheet.card_header}> <h5>Create new password</h5></Card.Header>
//             <Card.Body>
//               <form onSubmit={submit_fun}>
//                 <Row style={{ alignItems: 'center' }}>
//                   <Col md={4}>
//                     <div className={stylesheet.left}>
//                       <div className={stylesheet.profile_img}>
//                         <label>
//                           <img src={profile} alt="" width="100px" />
//                           {/* <input type="file" name="file" hidden /> */}
//                         </label>
//                       </div>
//                     </div>
//                   </Col>
//                   <Col md={6}>
//                     <div>
//                       <div style={{ textAlign: 'center' }}>
//                         <label style={{ fontSize: '14px', color: '#757575' }}>
//                           New password
//                           <span className="text-danger" style={{ fontSize: '20px' }}>
//                             *
//                           </span>
//                         </label>
//                         <div className={stylesheet.hide}>
//                           <input
//                             style={{
//                               border: 'none',
//                               borderBottom: '1px solid #757575',
//                               outline: 'none',
//                               width: '100%'
//                             }}
//                             type={ptype1}
//                             name="password"
//                             value={data.password}
//                             onChange={handleChange}
//                           />
//                           <div className={stylesheet.hideEye}>
//                                 {eye1 &&
//                  <FaEyeSlash style={{}} onClick={show_password1} />
//               }
//               {!eye1 &&
//                 <FaEye style={{ }} onClick={show_password1} />
//               }
//               </div>
//                         </div>
//                       </div>
//                         {errors && errors.password && (
//                         <p style={{margin:"0"}} className="text-danger">{errors.password}</p>
//                       )}
//                       <div style={{ textAlign: 'center' }}>
//                         <label for="phone" style={{ fontSize: '14px', color: '#757575' }}>
//                           Confirm password
//                           <span
//                             className="text-danger"
//                             style={{ fontSize: '20px', marginLeft: '2px' }}
//                           >
//                             *
//                           </span>
//                         </label>
//                         <div className={stylesheet.hide}>
//                           <input
//                             style={{
//                               border: 'none',
//                               borderBottom: '1px solid #757575',
//                               outline: 'none',
//                               width: '100%'
//                             }}
//                             type={ptype2}
//                             name="confirm_password"
//                             value={data.confirm_password}
//                             onChange={handleChange}
//                           />
//                           <div className={stylesheet.hideEye}>
//                                 {eye2 &&
//                  <FaEyeSlash style={{}} onClick={show_password2} />
//               }
//               {!eye2 &&
//                 <FaEye style={{}} onClick={show_password2} />
//               }
//               </div>
//                         </div>
//                       </div>
//                     </div>
//                     {errors && errors.confirm_password && (
//                         <p className="text-danger">{errors.confirm_password}</p>
//                       )}
//                   </Col>
//                 </Row>
//                 <div className={stylesheet.update_btn}>
//                   <Button type='submit'>Save changes</Button>
//                 </div>
//               </form>
//             </Card.Body>
//           </Card>
//         </div>
//       }
//     </div>
//   )
// }

// export default ResetPassword;


const ResetPassword = () => {

  const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({})
    const [error2, setError2] = useState(false)
    const [ptype, setPtype] = useState('password')
    const [eye1, seteye1] = useState(true);
    const [eye2, seteye2] = useState(true);
    const [ptype1, setPtype1] = useState('password')
    const [ptype2, setPtype2] = useState('password')
  
    const { state } = useLocation();
    if (state === null) {
      navigate('/login');
    }
    const [data, setData] = useState({
      email: state.email,
      password: '',
      confirm_password: ''
    });
  
    const submit_fun = async (e) => {
      e.preventDefault();
      const error = await validate_fun();
      setErrors(error);
      if (Object.keys(errors).length === 0) {
        reset_Password(data).then((res) => {
          console.log(res)
          setIsLoading(false);
          if (res.status === 1) {
            Swal.fire({
              position: "center",
              icon: "success",
              text: "Password has been updated.",
              showConfirmButton: false,
              timer: 2000
            });
            dispatch(reset_success_Fun());
          }
        })
      } else {
  
      }
    };
    const handleChange = (e) => {
      validate(e.target.name, e.target.value)
      setData({ ...data, [e.target.name]: e.target.value });
    };
    const validate = (name, value) => {
      switch (name) {
        case 'password':
          if (value.length === 0) {
            // Clear all errors when password length is 0
            setErrors({});
          }
          else if (value.length < 8) {
            setErrors({ ...errors, password: 'Password should be of minimum eight characters.' });
          }
          else if (value.length > 20) {
            setErrors({ ...errors, password: 'Password should be of maximum twenty characters.' });
          }
          else if (data.confirm_password.length>0 && data.confirm_password !== value) {
            setErrors({ ...errors, password: 'New password and Confirm password does not match.' });
          }
          else if(data.confirm_password === value){
            delete errors.password;
            delete errors.confirm_password;
            setErrors(errors);
          }
           else {
            delete errors.password;
            setErrors(errors);
          }
          break
        case 'confirm_password':
          if (value.length === 0) {
            // Clear all errors when password length is 0
            setErrors({});
          }
          else if (value.length < 8) {
            setErrors({ ...errors, confirm_password: 'Password should be of minimum eight characters.' });
          }
          else if (value.length > 20) {
            setErrors({ ...errors, confirm_password: 'Password should be of maximum twenty characters.' });
          }
          else if (data.password.length>0 && data.password !== value) {
            setErrors({ ...errors, confirm_password: 'New password and Confirm password does not match.' });
          }
          else if(data.password === value){
            delete errors.confirm_password;
            delete errors.password;
            setErrors(errors);
          } 
          else {
            delete errors.confirm_password;
            setErrors(errors);
          }
          break
      }
    }
    const validate_fun = async () => {
      let error = errors;
      if (data.password === "") {
        error["password"] = "New Password is required."
        setErrors({ ...errors, password: 'Password should be of minimum eight characters.' });
      }
      if (data.confirm_password.length === 0) {
        error["confirm_password"] = "Confirm Password is required."
        setErrors({ ...errors, confirm_password: 'Password should be of minimum eight characters.' });
      }
      console.log(error)
      return error;
    }
  
    const show_password1 = ()=>{
      if (ptype1 === "password") {
        setPtype1("text");
        seteye1(false);
      }
      else {
        setPtype1("password");
        seteye1(true);
      }
    }
    const show_password2 = ()=>{
      if (ptype2 === "password") {
        setPtype2("text");
        seteye2(false);
      }
      else {
        setPtype2("password");
        seteye2(true);
      }
    }
  
    useEffect(() => {
     setTimeout(()=>{
      setIsLoading(false);
     }, 2000)
    }, [])
    

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
                        <img src={profile} />
                      </div>
                    </CCardBody>
                  </CCard>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm onSubmit={submit_fun}>
                        <h5>Create New Password</h5>
                        <br />
                        <div className='mb-3'>
                        <CInputGroup>
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <CFormInput
                            placeholder="New Password"
                            type={ptype1}
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            // required
                          />
                             <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                          {eye1 &&
                 <FaEyeSlash style={{}} onClick={show_password1} />
              }
             {!eye1 &&
                <FaEye style={{}} onClick={show_password1} />
              }
      </div>
                        </CInputGroup>
      {errors && errors.password && (
                        <p  className="text-danger">{errors.password}</p>
                      )}
                        </div>
                        <div className='mb-3'>
                        <CInputGroup>
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <CFormInput
                            placeholder="Confirm Password"
                            type={ptype2}
                            name="confirm_password"
                            value={data.confirm_password}
                            onChange={handleChange}
                            // required
                            style={{ paddingRight: '2.5rem' }} // Adjust padding for the icon to fit
                          />
                          <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                          {eye2 &&
                 <FaEyeSlash style={{}} onClick={show_password2} />
              }
             {!eye2 &&
                <FaEye style={{}} onClick={show_password2} />
              }
      </div>
                        </CInputGroup>
                        {errors && errors.confirm_password && (
                        <p className="text-danger">{errors.confirm_password}</p>
                      )}
                        </div>
                        {/* {invalidCred &&
                        <CRow>
                        <p style={{color:'red',display:'flex', justifyContent:'center', textAlign:'center'}}>Invalid Email/Password</p>
                        </CRow>
                        } */}
                        <CRow>
                          <div className={style.my_btn}>
                            <button type="submit">Change Password</button>
                          </div>
                        </CRow>
                        <br />
                        {/* <CRow  >
                          <div className={style.reset_link}>
                            <NavLink to="/forget_password" >Forgot Password?</NavLink>
                          </div>
                        </CRow> */}
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

export default ResetPassword;
