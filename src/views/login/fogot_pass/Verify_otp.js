import React from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Verify_otp = (props) => {
    const { isOpen, closeFun, otp, setOtp, verifyFun, verify_error } = props;
    return (
        <div>
            <Modal show={isOpen} onHide={closeFun} style={{ marginTop: '110px'}}>
                <Modal.Header closeButton>
                    <Modal.Title>Verify OTP</Modal.Title>
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
                                        onChange={(e) =>setOtp(e.target.value)}
                                    />
                                </div>
                            </Col>
                           
                            <Col md={4}>
                                <div>
                                    <Button type='submit'>Verify</Button>
                                </div>
                            </Col>
                        </Row>
                        <Row className='my-0'>
                        <div style={{display:'flex',justifyContent:'flex-end' , paddingRight:'70px',paddingTop:'15px',}}>
                            <NavLink style={{textDecoration:'none'}} to="/login" >Back to Login</NavLink>
                          </div>
                        </Row>
                        {verify_error &&
                                <p className='text-danger'>Invalid OTP</p>
                            }
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Verify_otp