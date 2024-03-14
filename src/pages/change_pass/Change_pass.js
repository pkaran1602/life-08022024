import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'
import Card from 'react-bootstrap/Card'
import { change_password } from 'src/axios/Api'
import stylesheet from './change_pass.module.css';
import { FaEyeSlash ,FaEye } from "react-icons/fa";

const Change_pass  = () => {

  const [eye1, seteye1] = useState(true);
  const [eye2, seteye2] = useState(true);
  const [eye3, seteye3] = useState(true);
  const [errors, setErrors] = useState({})
  const [ptype1, setPtype1] = useState('password')
  const [ptype2, setPtype2] = useState('password')
  const [ptype3, setPtype3] = useState('password')
  const [data, setData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });

  const validate = (name, value) => {
    switch (name) {
      case 'current_password':
        if (value.length < 8) {
          setErrors({ ...errors, current_password: 'Password should be of minimum eight characters.' });
        }
        else if(value.length > 12){
          setErrors({ ...errors, current_password: 'Password should be of minimum twelve characters.' });
        } else {
          delete errors.current_password;
          setErrors(errors);
        }
        break
        case 'new_password':
          if (value.length < 8) {
            setErrors({ ...errors, new_password: 'Password should be of minimum eight characters.' });
          }
          else if(value.length > 12){
            setErrors({ ...errors, new_password: 'Password should be of minimum twelve characters.' });
          }
           else {
            delete errors.new_password;
            setErrors(errors);
          }
          break
        case 'confirm_password':
          if (value.length < 8) {
            setErrors({ ...errors, confirm_password: 'Password should be of minimum eight characters.' });
          }
          else if(value.length > 12){
            setErrors({ ...errors, confirm_password: 'Password should be of minimum twelve characters.' });
          }
           else if (data.new_password !== value) {
            setErrors({ ...errors, confirm_password: 'New Password and Confirm Password does not match.' });
          } 
          else {
            delete errors.confirm_password;
            setErrors(errors);
          }
          break
    }
  };

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
  const show_password3 = ()=>{
    if (ptype3 === "password") {
      setPtype3("text");
      seteye3(false);
    }
    else {
      setPtype3("password");
      seteye3(true);
    }
  }


  const handleChange = (e) => {
    validate(e.target.name, e.target.value)
    setData({ ...data, [e.target.name]: e.target.value })
  };

  const validate_fun =async ()=>{
    let error = errors;
    if(data.current_password === ""){
      error["current_password"] ="Current Password is required."
      setErrors({ ...errors, current_password: 'Password should be of minimum eight characters.' });
    }
    if(data.new_password.length === 0){
      error["new_password"] ="New Password is required."
      setErrors({ ...errors, new_password: 'Password should be of minimum eight characters.' });
    }
    if(data.confirm_password.length === 0){
      error["confirm_password"] ="Confirm Password is required."
      setErrors({ ...errors, confirm_password: 'Password should be of minimum eight characters.' });
    }
    return error;
  }

  const submit_fun = async(e) => {
    e.preventDefault()
    const error = await validate_fun();
    setErrors(error);
    if(Object.keys(errors).length ===0){
      change_password(data).then((response) => {
        if (response.status === 1) {
          Swal.fire({
            text: 'Password has been changed successfully.',
            icon: 'success',
            showConfirmButton: false,
            timer: 1200,
            
          })
          setData({ current_password: '', new_password: '', confirm_password: '' })
        } else if (response.status === 0) {
          Swal.fire({
            text: "Current password is invalid.",
            icon: 'warning',
            showConfirmButton: false,
            timer: 1200,
          })
        }
      })
    }
    else{
      // console.log(errors)
    }
  };

  return (
    <div className={stylesheet.container}>
      <Card className={stylesheet.card}>
        <Card.Header className={stylesheet.card_header}> 
        <div className='d-flex justify-content-between'>
            <div>
            <h5>CHANGE PASSWORD</h5>
            </div>
            <div>
            <p style={{fontSize:'12px',paddingRight:'10px'}}><span className='text-danger'>*</span> Indicates required field</p>
            </div>
            </div>
         </Card.Header>
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
                          type={ptype1}
                          name="current_password"
                          value={data.current_password}
                          onChange={handleChange}
                        />
                       
              {eye1 &&
                 <FaEyeSlash style={{marginLeft:"-13px"}} onClick={show_password1} />
              }
              {!eye1 &&
                <FaEye style={{marginLeft:"-13px"}} onClick={show_password1} />
              }
    
                      </div>  
                      </div>
                      {errors && errors.current_password && (
                        <p className="text-danger">{errors.current_password}</p>
                      )}
                       <div> 
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
                          type={ptype2}
                          name="new_password"
                          value={data.new_password}
                          onChange={handleChange}
                        />
                          {eye2 &&
                 <FaEyeSlash style={{marginLeft:"-13px"}} onClick={show_password2} />
              }
              {!eye2 &&
                <FaEye style={{marginLeft:"-13px"}} onClick={show_password2} />
              }
                      </div>
                    </div>
                    {errors && errors.new_password && <p className="text-danger">{errors.new_password}</p>}
                    <div>
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
                          type={ptype3}
                          name="confirm_password"
                          value={data.confirm_password}
                          onChange={handleChange}
                        />                      
                          {eye3 &&
                 <FaEyeSlash style={{marginLeft:"-13px"}} onClick={show_password3} />
              }
              {!eye3 &&
                <FaEye style={{marginLeft:"-13px"}} onClick={show_password3} />
              }
             
                      </div>
                    </div>
                    {errors && errors.confirm_password && (
                      <p className="text-danger">{errors.confirm_password}</p>
                    )}
                    <div>          
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
