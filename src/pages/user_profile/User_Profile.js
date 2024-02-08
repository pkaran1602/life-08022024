import React, { useEffect, useState } from 'react'
import stylesheet from './user_profile.module.css'
import { CardFooter, Col, Container, Row } from 'react-bootstrap'
import profile from '../../assets/images/profile.png'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Swal from 'sweetalert2'
import Card from 'react-bootstrap/Card'
import { get_admin_data, update_admin_data, user_details } from 'src/axios/Api'

const User_Profile = () => {

  const [user_data, setUser_data] = useState({})
  const [error2, setError2] = useState(false)
  const [file, setFile] = useState(null)
  const [errors, setErrors] = useState({})

  const handleFile = (e) => {
    setFile(e.target.files[0])
    const [file] = e.target.files
    setUser_data({ ...user_data, ["profile_pic"]: URL.createObjectURL(file) })
  };

  const handleChange = (e) => {
    validate(e.target.name, e.target.value)
    setUser_data({ ...user_data, [e.target.name]: e.target.value })
  };

  const validate = (name, value) => {
    switch (name) {
      case "phone":
        if (value.length < 10 || value.length > 10) {
          setErrors({ ...errors, phone: "Please enter numeric value only in Mobile Number" })
        } else {
          delete errors.phone;
          setErrors(errors);
        }
        break;
      case "name":
        if (value.length < 2) {
          setErrors({ ...errors, firstname: "Name should be not less than 2 characters" })
        } else if (value.length > 30) {
          setErrors({ ...errors, firstname: "Name should be not more than 30 character" })
        } else {
          delete errors.firstname;
          setErrors(errors);
        }
        break;
      case 'email':
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (!value.match(validRegex)) {
          setErrors({
            ...errors,
            email: 'Please enter a valid email !',
          })
        } else {
          delete errors.email
          setErrors(errors)
        }
        break
      default:
        break
    }
  };

  const submit_fun = (e) => {
    e.preventDefault()
    setError2(false)
    if (user_data.name.length === 0 || user_data.email.length === 0 || user_data.phone.length === 0) {
      setError2(true)
    }
    else {
      var formdata = new FormData();
      formdata.append("profile_pic", file)
      formdata.append("id", user_data.id)
      formdata.append("name", user_data.name)
      formdata.append("email", user_data.email)
      formdata.append("phone", user_data.phone)
      update_admin_data(formdata).then((response) => {
        if (response.status === 1) {
          user_profile();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Changes Has Been Made',
            showConfirmButton: false,
            timer: 1500,
          })
        }
      });
    }
  };

  const user_profile = () => {
    get_admin_data().then((res) => {
      if (res.status === 1) {
        setUser_data(res.data)
      }
    })
  };

  useEffect(() => {
    user_profile();
  }, []);

  return (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <Card style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }} >
        <Card.Header as="h5" style={{ textAlign: 'center' }} >UPDATE PROFILE DETAILS</Card.Header>
        <Card.Body>
          <form onSubmit={submit_fun}>
            <div className={stylesheet.container}>
              <div>
                <Row>
                  <Col>

                    <label for="firstname" style={{ fontSize: '14px', color: '#757575' }}>
                      Please select profile picture to upload.{' '}
                      <span className="text-danger" style={{ fontSize: '20px' }}>
                        *
                      </span>{' '}
                    </label>

                    <div className={stylesheet.profile_img}>
                      <div>
                        <label>
                          <img src={user_data.profile_pic !== "" ? user_data.profile_pic : profile} alt="" width="100px" />
                          <input type="file" name="file" onChange={handleFile} hidden />
                        </label>
                      </div>
                    </div>
                    <div>
                      {/* {error2 && img === null ?
                        <label style={{ color: 'red' }}>Profile Picture is Required</label>
                        : ""
                      } */}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="me-1">

                    <div>
                      <label for="name" style={{ fontSize: '14px', color: '#757575' }}>
                        Name
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
                          }}
                          type="text"
                          name="name"
                          value={user_data.name}
                          onChange={handleChange}

                        />
                      </div>
                    </div>
                    {errors && errors.firstname && (
                      <p className="text-danger">{errors.name}</p>
                    )}
                    <div>
                      {error2 && user_data.name.length === 0 ?
                        <label style={{ color: 'red' }}>Name is Required</label>
                        : ""
                      }
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div>
                      <label for="email" style={{ fontSize: '14px', color: '#757575' }}>
                        Email
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
                          }}

                          type="email"
                          name="email"
                          value={user_data.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    {errors && errors.email && <p className="text-danger">{errors.email}</p>}
                    <div>
                      {error2 && user_data.email.length === 0 ?
                        <label style={{ color: 'red' }}>Email is Required</label>
                        : ""
                      }
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div>
                      <label for="phone" style={{ fontSize: '14px', color: '#757575' }}>
                        Phone No
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
                          }}
                          type="tel"
                          name="phone"
                          value={user_data.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    {errors && errors.phone && <p className="text-danger">{errors.phone}</p>}
                    <div>
                      {error2 && user_data.phone.length === 0 ?
                        <label style={{ color: 'red' }}>Contact is Required</label>
                        : ""
                      }
                    </div>
                  </Col>
                </Row>
              </div>
              <br />
              <div className={stylesheet.my_btn}>
                <button type='submit'>Save changes</button>
              </div>
            </div>
          </form>
        </Card.Body>

      </Card>

    </div>
  )
}

export default User_Profile