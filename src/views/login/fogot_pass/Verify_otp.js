import React from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap';

const Verify_otp = (props) => {
    const { isOpen, closeFun, otp, setOtp, verifyFun, verify_error } = props;
    return (
        <div>
            <Modal show={isOpen} onHide={closeFun} style={{ marginTop: '110px'}}>
                <Modal.Header closeButton>
                    <Modal.Title>Verify OTP</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='px-4 pb-5' onSubmit={verifyFun}>
                        <Row>
                            <div>
                                <label>OTP :</label>
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
                        {verify_error &&
                                <p>ERROR</p>
                            }
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Verify_otp