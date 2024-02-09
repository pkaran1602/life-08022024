
import Modal from 'react-bootstrap/Modal';
import stylesheet from './userdetail.module.css'
import img1 from '../../assets/images/profile.png'
import { Col, Row } from 'react-bootstrap';

const UserDetail = (props) => {

  const { close_fun, selectedUser, isOpen } = props

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={isOpen} onHide={close_fun} className={stylesheet.my_modal}>
        <Modal.Header closeButton>
          <Modal.Title>{`${selectedUser.FirstName} ${selectedUser.MiddleName} ${selectedUser.LastName}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={stylesheet.container}>
            <div className={stylesheet.my_profile}>
              <img src={selectedUser.profile_photo === "" ? img1 : selectedUser.profile_photo} />
            </div>
            <div className={stylesheet.my_details}>
              <Row>
                <Col md={6}>
                  <p> <strong>Email:</strong>  {selectedUser.Email}</p>
                </Col>
                <Col md={6}>
                  <p> <strong>Phone:</strong> {selectedUser.Mobile}</p>
                </Col>
              </Row>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UserDetail;
