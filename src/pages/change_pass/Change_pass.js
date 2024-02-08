import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import stylesheet from './change_pass.module.css'
import Swal from 'sweetalert2'
import Card from 'react-bootstrap/Card'
import { change_password } from 'src/axios/Api'
import { useNavigate } from 'react-router-dom'

const Change_pass = () => {

  const [errors, setErrors] = useState({})
  const [error2, setError2] = useState(false)
  const [ptype, setPtype] = useState('password')
  const [data, setData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });

  const validate = (name, value) => {
    switch (name) {
      case 'current_password':
        if (value.length < 6) {
          setErrors({ ...errors, current_password: 'Password should be minimum 6 characters long.' })
        } else {
          delete errors.current_password
          setErrors(errors)
        }
        break
      case 'new_password':
        if (value.length < 6) {
          setErrors({ ...errors, new_password: 'Password should be minimum 6 characters long.' })
        } else {
          delete errors.new_password
          setErrors(errors)
        }
        break
      case 'confirm_password':
        if (value.length < 6) {
          setErrors({ ...errors, confirm_password: 'Password should be minimum 6 characters long.' })
        } else if (data.new_password !== value) {
          setErrors({ ...errors, confirm_password: 'New Password and Confirm Password does not match.' })
        } else {
          delete errors.confirm_password
          setErrors(errors)
        }
        break
    }
  };

  const handleChange = (e) => {
    validate(e.target.name, e.target.value)
    setData({ ...data, [e.target.name]: e.target.value })
  };

  const submit_fun = (e) => {
    e.preventDefault()

    if (data.current_password.length===0 || data.current_password.length===0 || data.current_password.length===0) {
      setError2(true)
    } 
    else{
      change_password(data).then((response)=>{
        if(response.status ===1){ 
          Swal.fire({
            title: 'Password has been changed successfully',
            icon: 'success',
          })
          setData({ current_password: '', new_password: '', confirm_password: '' })
          setError2(false)
        }
      })
    }
  };

  return (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <Card style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', marginTop: '50px' }}>
        <Card.Header as="h5" style={{ textAlign: 'center' }}>
          CHANGE PASSWORD
        </Card.Header>
        <Card.Body>
          <form onSubmit={submit_fun}>
            <div className={stylesheet.container}>
              <div>
                <Row>
                  <Col className="me-1">
                    {' '}
                    <div>
                      <label for="current_password" style={{ fontSize: '14px', color: '#757575' }}>
                        Current Password{' '}
                        <span className="text-danger" style={{ fontSize: '20px' }}>
                          *
                        </span>{' '}
                      </label>
                      <div>
                        <input
                          style={{
                            border: 'none',
                            borderBottom: '1px solid #757575',
                            outline: 'none',
                          }}
                          type={ptype}
                          name="current_password"
                          value={data.current_password}
                          onChange={handleChange}
                        />
                      </div>
                      {errors && errors.current_password && (
                        <p className="text-danger">{errors.current_password}</p>
                      )}
                    </div>
                    <div>
                        {error2 && data.current_password.length===0 ?
                        <label style={{ color: 'red' }}>Current Password is Required</label>
                        :""
                      }
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div>
                      <label for="new_password" style={{ fontSize: '14px', color: '#757575' }}>
                        New Password
                        <span
                          className="text-danger"
                          style={{ fontSize: '20px', marginLeft: '3px' }}
                        >
                          *
                        </span>{' '}
                      </label>
                      <div>
                        <input
                          style={{
                            border: 'none',
                            borderBottom: '1px solid #757575',
                            outline: 'none',
                          }}
                          type={ptype}
                          name="new_password"
                          value={data.new_password}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    {errors && errors.new_password && <p className="text-danger">{errors.new_password}</p>}
                    <div>
                          {error2 && data.new_password.length===0?
                          <label style={{ color: 'red' }}>New Password is Required</label>
                          :""
                        }
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div>
                      <label for="confirm_password" style={{ fontSize: '14px', color: '#757575' }}>
                        Confirm Password
                        <span
                          className="text-danger"
                          style={{ fontSize: '20px', marginLeft: '3px' }}
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
                          }}
                          type={ptype}
                          name="confirm_password"
                          value={data.confirm_password}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    {errors && errors.confirm_password && (
                      <p className="text-danger">{errors.confirm_password}</p>
                    )}
                    <div>
                      {error2 && data.confirm_password.length===0 ?
                      <label style={{ color: 'red' }}>Confirm Password is Required</label>
                    :""  
                    }
                    </div>
                  </Col>
                </Row>
              </div>
              <br />
              <div className={stylesheet.my_btn}>
                <button type="submit">Change Password</button>
              </div>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  )
};

export default Change_pass
