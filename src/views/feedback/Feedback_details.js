
import Modal from 'react-bootstrap/Modal';
import stylesheet from './feedback.module.css'
import img1 from '../../assets/images/profile.png'
import { Col, Row } from 'react-bootstrap';

const Feedback_details = (props) => {

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
        <Modal.Header style={{backgroundColor:'#CBB989'}} closeButton>
          <Modal.Title>Feedback Details</Modal.Title>
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
                <div className={stylesheet.content_heading} ><strong>Name</strong></div>
                <div className={stylesheet.content_details}> <p>   {selectedUser.name ? selectedUser.name:"N/A"}</p></div>
                </div>
                </Col>
                </Row>
                <Row>
                <Col>
                <div className={stylesheet.content_column}>
                <div className={stylesheet.content_heading}><strong>Email</strong></div>
                <div className={stylesheet.content_details}> <p>   {selectedUser.email ? selectedUser.email :"N/A"}</p></div>
                </div>
                </Col>
                </Row>
                <Row>
                <Col>
                <div className={stylesheet.content_column}>
                <div className={stylesheet.content_heading}><strong>Message</strong></div>
                <div className={stylesheet.content_details} style={{wordBreak:"break-word"}}> <p>   {selectedUser.feedback ?selectedUser.feedback:"N/A"}</p></div>
                </div>
                </Col>
                </Row>
                <Row>
                <Col>
                <div className={stylesheet.content_column}>
                <div className={stylesheet.content_heading}><strong>Device Type</strong></div>
                <div className={stylesheet.content_details}> <p>   {selectedUser.device_type ? selectedUser.device_type :"N/A"}</p></div>
                </div>
                </Col>
                </Row>
                <Row>
                <Col>
                <div className={stylesheet.content_column}>
                <div className={stylesheet.content_heading}><strong>App Version</strong></div>
                <div className={stylesheet.content_details}> <p>   {selectedUser.app_version ? selectedUser.app_version:"N/A"}</p></div>
                </div>
                </Col>
                </Row>
                <Row>
                <Col>
                <div className={stylesheet.content_column}>
                <div className={stylesheet.content_heading}><strong>OS Version </strong></div>
                <div className={stylesheet.content_details}> <p>   {selectedUser.os_version ? selectedUser.os_version:"N/A"}</p></div>
                </div>
                </Col>
                </Row>
                {/* <Row>
                <Col>
                <div className={stylesheet.content_column}>
                <div className={stylesheet.content_heading}><strong>OS Version</strong></div>
                <div className={stylesheet.content_details}> <p>   {selectedUser.Mobile ? selectedUser.Mobile :"N/A"}</p></div>
                </div>
                </Col>
                </Row> */}
                <Row>
                <Col>
                <div className={stylesheet.content_column}>
                <div className={stylesheet.content_heading}><strong>Device Name</strong></div>
                <div className={stylesheet.content_details}> <p>   {selectedUser.device_name ? selectedUser.device_name :"N/A"}</p></div>
                </div>
                </Col>
                </Row>
               
                <Row>
                <Col>
                <div className={stylesheet.content_columns}>
                <div className={stylesheet.content_heading}><strong>Submitted On</strong></div>
                <div className={stylesheet.content_details}> <p>   {selectedUser.date ? selectedUser.date :"N/A"}</p></div>
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

export default Feedback_details;
