import React, { useEffect, useState } from 'react'
import stylesheet from './user_profile.module.css'
import { Col, Row } from 'react-bootstrap'
import profile from '../../assets/images/profile.png'
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'
import Card from 'react-bootstrap/Card'
import { get_admin_data, update_admin_data } from 'src/axios/Api'

const User_Profile = () => {

  const [user_data, setUser_data] = useState({});
  const [error2, setError2] = useState(false);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

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
        if (value.length < 0 || value.length > 10) {
          setErrors({ ...errors, phone: "Please enter numeric value only in Mobile Number" })
        } else {
          delete errors.phone;
          setErrors(errors);
        }
        break;
      case "name":
        if (value.length ===1) {
          setErrors({ ...errors, name: "Name should be not less than 2 characters" })
        } else if (value.length > 50) {
          setErrors({ ...errors, name: "Name should be not more than 50 character" })
        } else {
          delete errors.name;
          setErrors(errors);
        }
        break;
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
      default:
        break
    }
  };

  const submit_fun = (e) => {
    e.preventDefault()
    setError2(false)
    if (user_data.name.length === 0 || user_data.email.length === 0 || user_data.phone.length === 0) {
      setErrors("")
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
            text: 'Changes Has Been Made',
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
    <div className={stylesheet.container}>
      <Card className={stylesheet.card}>
        <Card.Header className={stylesheet.card_header}> <h5>Update profile details</h5></Card.Header>
        <Card.Body>
          <form onSubmit={submit_fun}>
            <Row>
              <Col md={4}>
                <div className={stylesheet.left}>
                  <div>
                    <div className={stylesheet.profile_img}>

                      <div>
                        <label className={stylesheet.image_label}>
                          Upload picture.
                          <span className="text-danger" style={{ fontSize: '20px' }}>
                            *
                          </span>
                        </label>
                        <label>
                          <img src={user_data.profile_pic !== "" ? user_data.profile_pic : profile} alt="" width="100px" />
                          <input accept="image/png , image/jpeg" type="file" name="file" onChange={handleFile} hidden />
                        </label>
                      </div>
                    </div>

                  </div>
                </div>
              </Col>
              <Col md={8}>
                <div className={stylesheet.right}>
                  <div>
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
                            width: '80%'
                          }}
                          type="text"
                          name="name"
                          value={user_data.name}
                          onChange={handleChange}

                        />
                      </div>
                    </div>
                    {errors && errors.name && (
                      <p className="text-danger">{errors.name}</p>
                    )}
                    <div>
                      {error2 && user_data.name.length === 0 ?
                        <label style={{ color: 'red' }}>Name is required field</label>
                        : ""
                      }
                    </div>
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
                            width: '80%'
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
                        <label style={{ color: 'red' }}>Email is required field </label>
                        : ""
                      }
                    </div>

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
                            width: '80%'
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
                        <label style={{ color: 'red' }}>Contact is required field</label>
                        : ""
                      }
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

export default User_Profile
