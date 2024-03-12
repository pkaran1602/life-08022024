import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'
import Card from 'react-bootstrap/Card'
import { change_password } from 'src/axios/Api'
import stylesheet from './change_pass.module.css'

const Change_pass  = () => {

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
        if (value.length < 8) {
          if (value.length === 0) {
            delete errors.current_password;
            setError2(false)
          } else {
            setErrors({ ...errors, current_password: 'Password should be of minimum eight characters' });
          }
        } else {
          delete errors.current_password;
          setErrors(errors);
        }
        break
        case 'new_password':
          if (value.length < 8) {
            if (value.length === 0) {
              delete errors.new_password;
              setError2(false)
            } else {
              setErrors({ ...errors, new_password: 'Password should be of minimum eight characters' });
            }
          } else {
            delete errors.new_password;
            setErrors(errors);
          }
          break
        case 'confirm_password':
          if (value.length < 8) {
            if (value.length === 0) {
              delete errors.confirm_password;
              setError2(false)
            } else {
              setErrors({ ...errors, confirm_password: 'Password should be of minimum eight characters' });
            }
          } else if (data.new_password !== value) {
            setErrors({ ...errors, confirm_password: 'New Password and Confirm Password does not match.' });
          } else {
            delete errors.confirm_password;
            setErrors(errors);
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
    if (data.current_password.length === 0 || data.new_password.length === 0 || data.confirm_password.length === 0) {
      setError2(true)
    }
    else {
      change_password(data).then((response) => {
        if (response.status === 1) {
          Swal.fire({
            title: 'Password has been changed successfully',
            icon: 'success',
          })
          setData({ current_password: '', new_password: '', confirm_password: '' })
          setError2(false)
        } else if (response.status === 0) {
          Swal.fire({
            title: "Current password is invalid.",
            icon: 'warning',
          })
          setData({ current_password: '', new_password: '', confirm_password: '' })
        }
      })
    }
  };

  return (
    <div className={stylesheet.container}>
      <Card className={stylesheet.card}>
        <Card.Header className={stylesheet.card_header}>  CHANGE PASSWORD</Card.Header>
        <Card.Body className={stylesheet.card_body}>
          <form onSubmit={submit_fun}>
            <Row>
              <Col>
                <div className={stylesheet.right}>
                  <div>
                  <div>
                      <label for="current_password" style={{ fontSize: '14px', color: '#757575' }}>
                        Current Password{' '}
                        <span className="text-danger" style={{ fontSize: '20px' }}>
                          *
                        </span>{' '}
                      </label>
                      <div>
                        <input className={stylesheet.my_input}
                          type={ptype}
                          name="current_password"
                          value={data.current_password}
                          onChange={handleChange}
                        />
                      </div>  
                      </div>
                      {errors && errors.current_password && (
                        <p className="text-danger">{errors.current_password}</p>
                      )}
                       <div>
                      {error2 && data.current_password.length === 0 ?
                        <label style={{ color: 'red' }}>Current Password is Required</label>
                        : ""
                      }
                    </div>      
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
                        className={stylesheet.my_input}
                          type={ptype}
                          name="new_password"
                          value={data.new_password}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    {errors && errors.new_password && <p className="text-danger">{errors.new_password}</p>}
                    <div>
                      {error2 && data.new_password.length === 0 ?
                        <label style={{ color: 'red' }}>New Password is Required</label>
                        : ""
                      }
                    </div>
                    <div>
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
                         className={stylesheet.my_input}
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
                      {error2 && data.confirm_password.length === 0 ?
                        <label style={{ color: 'red' }}>Confirm Password is Required</label>
                        : ""
                      }
                    </div>
                    </div>
                  </div>
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
  )
}

export default Change_pass ;
