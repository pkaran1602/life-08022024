import React, { useEffect, useState } from 'react'
import stylesheet from './resetpassword.module.css'
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
// import { get_admin_data, update_admin_data, user_details } from 'src/axios/Api'

const ResetPassword = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({})
  const [error2, setError2] = useState(false)
  const [ptype, setPtype] = useState('password')

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
        setIsLoading(false);
        if (res.status === 1) {
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Password has been created successfully",
            showConfirmButton: false,
            timer: 1500
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
        if (value.length < 8) {
          setErrors({ ...errors, password: 'Password should be of minimum eight characters.' });
        }
        else if (value.length > 12) {
          setErrors({ ...errors, password: 'Password should be of minimum twelve characters.' });
        } else {
          delete errors.password;
          setErrors(errors);
        }
        break
      case 'confirm_password':
        if (value.length < 8) {
          setErrors({ ...errors, confirm_password: 'Password should be of minimum eight characters.' });
        }
        else if (value.length > 12) {
          setErrors({ ...errors, confirm_password: 'Password should be of minimum twelve characters.' });
        }
        else {
          delete errors.confirm_password;
          setErrors(errors);
        }
        break



      // case 'password':
      //   if (value.length < 6) {
      //     if (value.length === 0) {
      //       delete errors.password;
      //       setError2(false)
      //     } else {
      //       setErrors({ ...errors, password: 'Password should be minimum 6 characters long.' });
      //     }
      //   } else {
      //     delete errors.password;
      //     setErrors(errors);
      //   }
      //   break
      // case 'confirm_password':
      //   if (value.length < 6) {
      //     if (value.length === 0) {
      //       delete errors.confirm_password;
      //       setError2(false)
      //     } else {
      //       setErrors({ ...errors, confirm_password: 'Password should be minimum 6 characters long.' });
      //     }
      //   } else if (data.password !== value) {
      //     setErrors({ ...errors, confirm_password: 'New Password and Confirm Password does not match.' });
      //   } else {
      //     delete errors.confirm_password;
      //     setErrors(errors);
      //   }
      //   break
    }
  }
  const validate_fun = async () => {
    let error = errors;
    if (data.password === "") {
      error["password"] = "Password is required."
      setErrors({ ...errors, password: 'Password should be of minimum eight characters.' });
    }
    if (data.confirm_password.length === 0) {
      error["confirm_password"] = "Confirm Password is required."
      setErrors({ ...errors, confirm_password: 'Password should be of minimum eight characters.' });
    }
    return error;
  }
  return (
    <div>
      {isLoading &&
        <My_Loader />
      }
      {!isLoading &&
        <div className={stylesheet.container}>
          <Card className={stylesheet.card}>
            <Card.Header className={stylesheet.card_header}> <h5>Create new password</h5></Card.Header>
            <Card.Body>
              <form onSubmit={submit_fun}>
                <Row style={{ alignItems: 'center' }}>
                  <Col md={4}>
                    <div className={stylesheet.left}>
                      <div className={stylesheet.profile_img}>
                        <label>
                          <img src={profile} alt="" width="100px" />
                          {/* <input type="file" name="file" hidden /> */}
                        </label>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div>
                      <div style={{ textAlign: 'center' }}>
                        <label style={{ fontSize: '14px', color: '#757575' }}>
                          New password
                          <span className="text-danger" style={{ fontSize: '20px' }}>
                            *
                          </span>
                        </label>
                        <div>
                          <input
                            style={{
                              border: 'none',
                              borderBottom: '1px solid #757575',
                              outline: 'none',
                              width: '100%'
                            }}
                            type={ptype}
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                          />
                        </div>

                      </div>
                      {/* {errors && errors.password && <p className="text-danger">{errors.password}</p>}
                    <div>
                      {error2 && data.password.length === 0 ?
                        <label style={{ color: 'red' }}>New Password is Required</label>
                        : ""
                      }
                    </div> */}
                      <div style={{ textAlign: 'center' }}>
                        <label for="phone" style={{ fontSize: '14px', color: '#757575' }}>
                          Confirm password
                          <span
                            className="text-danger"
                            style={{ fontSize: '20px', marginLeft: '2px' }}
                          >
                            *
                          </span>
                        </label>
                        <div>
                          <input
                            style={{
                              border: 'none',
                              borderBottom: '1px solid #757575',
                              outline: 'none',
                              width: '100%'
                            }}
                            type={ptype}
                            name="confirm_password"
                            value={data.confirm_password}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      {/* {errors && errors.confirm_password && (
                      <p className="text-danger">{errors.confirm_password}</p>
                    )}
                    <div>
                      {error2 && data.confirm_password.length === 0 ?
                        <label style={{ color: 'red' }}>Confirm Password is Required</label>
                        : ""
                      }
                    </div> */}
                    </div>
                  </Col>
                </Row>
                <div className={stylesheet.update_btn}>
                  <Button type='submit'>Save changes</Button>
                </div>
              </form>
            </Card.Body>
          </Card>
        </div>
      }
    </div>
  )
}

export default ResetPassword;
