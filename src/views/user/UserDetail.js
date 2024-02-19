
import Modal from 'react-bootstrap/Modal';
import stylesheet from './userdetail.module.css'
import img1 from '../../assets/images/profile.png'
import { Col, Row } from 'react-bootstrap';

const UserDetail = (props) => {

  const { close_fun, selectedUser, isOpen } = props
  
  const formatDOB = (dob) => {
    const date = new Date(dob);
    if (isNaN(date.getTime())) {
      return "N/A"; // Return "NA" if the date is not valid
  }
    const day = date.getDate().toString().padStart(2, '0');
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    // Array of month names
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Get the month name using the month index
    const monthName = monthNames[monthIndex];

    return `${day} ${monthName} ${year}`;
};

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={isOpen} onHide={close_fun} className={stylesheet.my_modal}>
        <Modal.Header style={{backgroundColor:'skyblue'}} closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className={stylesheet.main_body}>
          <div className={stylesheet.container}>
            <div className={stylesheet.my_profile}>
              <img src={selectedUser.profile_photo === "" ? img1 : selectedUser.profile_photo} />
            </div>
            <div className={stylesheet.my_details}>
              <Row>
              <Col>
                <div className={stylesheet.content_column} >
                <div className={stylesheet.content_heading} ><strong>First name</strong></div>
                <div className={stylesheet.content_details}> <p>   {selectedUser.FirstName ? selectedUser.FirstName:"N/A"}</p></div>
                </div>
                </Col>
                </Row>
                <Row>
                <Col>
                <div className={stylesheet.content_column}>
                <div className={stylesheet.content_heading}><strong>Middle name</strong></div>
                <div className={stylesheet.content_details}> <p>   {selectedUser.MiddleName ? selectedUser.MiddleName :"N/A"}</p></div>
                </div>
                </Col>
                </Row>
                <Row>
                <Col>
                <div className={stylesheet.content_column}>
                <div className={stylesheet.content_heading}><strong>Last name</strong></div>
                <div className={stylesheet.content_details}> <p>   {selectedUser.LastName ?selectedUser.LastName:"N/A"}</p></div>
                </div>
                </Col>
                </Row>
                <Row>
                <Col>
                <div className={stylesheet.content_column}>
                <div className={stylesheet.content_heading}><strong>Email</strong></div>
                <div className={stylesheet.content_details}> <p>   {selectedUser.Email ? selectedUser.Email:"N/A"}</p></div>
                </div>
                </Col>
                </Row>
                <Row>
                <Col>
                <div className={stylesheet.content_column}>
                <div className={stylesheet.content_heading}><strong>Phone</strong></div>
                <div className={stylesheet.content_details}> <p>   {selectedUser.Mobile ? selectedUser.Mobile :"N/A"}</p></div>
                </div>
                </Col>
                </Row>
                <Row>
                <Col>
                <div className={stylesheet.content_column}>
                <div className={stylesheet.content_heading}><strong>DOB</strong></div>
                <div className={stylesheet.content_details}> <p>   {formatDOB(selectedUser.BirthDate ? selectedUser.BirthDate:"N/A")}</p></div>
                </div>
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
