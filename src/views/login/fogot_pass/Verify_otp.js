import React from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Verify_otp = (props) => {
    const { isOpen, closeFun, otp, setOtp, resend_otp,verifyFun, verify_error,handleChange1 } = props;
    console.log(verify_error)

   

    return (
        <div>
            <Modal show={isOpen} onHide={closeFun} backdrop="static" keyboard={false} style={{ marginTop: '110px'}}>
                <Modal.Header closeButton>
                    <Modal.Title>OTP Verification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='px-4 pb-3' onSubmit={verifyFun}>
                        <Row>
                            <div>
                                <label>Enter OTP</label>
                            </div>
                        </Row>
                        <Row >
                            <Col md={8}>
                                <div>
                                    <input 
                                        className='form-control'
                                        name='otp'
                                        value={otp}
                                        onChange={handleChange1}
                                    />
                                </div>
                            </Col>
                          
                            <Col md={4}>
                                <div>
                                    <Button type='submit'>Verify</Button>
                                </div>
                            </Col>
                          
                        </Row>
                        {verify_error &&
                                <p style={{marginTop:'5px'}} className='text-danger'>{verify_error}</p>
                            }
                        <Row className='my-0'>
                        <div style={{display:'flex',justifyContent:'flex-end' , paddingRight:'70px',paddingTop:'15px',}}>
                            <NavLink style={{textDecoration:'none'}} to="/login" >Back to Login</NavLink>
                          </div>
                        </Row>
                        <Col style={{display:'flex', justifyContent:'start'}}>
                                <div>
                                    <NavLink  style={{textDecoration:'none'}} onClick={resend_otp}>Send Again</NavLink>
                                </div>
                            </Col>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Verify_otp