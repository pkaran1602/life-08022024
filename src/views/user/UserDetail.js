
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
        <Modal.Header style={{backgroundColor:'#CBB989'}} closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className={stylesheet.main_body}>
          <div className={stylesheet.container}>
            <div className={stylesheet.my_profile}>
              <img src={selectedUser.Profile_Photo === "" ? img1 : selectedUser.Profile_Photo} alt='user-pic' />
            </div>
              {/* <p style={{ display:"flex",justifyContent:"center", fontSize: "13px",color:"black", fontWeight: "500"  }}>Profile Picture</p> */}
            <div className={stylesheet.my_details}>
              <Row>
              <Col>
                <div className={stylesheet.content_column} >
                <div className={stylesheet.content_heading} ><strong>Name</strong></div>
                <div className={stylesheet.content_details}> <p>   {selectedUser.Name ? selectedUser.Name:"N/A"}</p></div>
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
                <div className={stylesheet.content_heading}><strong> Date Of Birth</strong></div>
                <div className={stylesheet.content_details}> <p>   {formatDOB(selectedUser.Birthdate ? selectedUser.Birthdate:"N/A")}</p></div>
                </div>
                </Col>
              </Row>
              <Row>
                <Col>
                <div className={stylesheet.content_column}>
                <div className={stylesheet.content_heading}><strong>Gender</strong></div>
                <div className={stylesheet.content_details}> <p>   {selectedUser.Gender ? selectedUser.Gender :"N/A"}</p></div>
                </div>
                </Col>
                </Row>
              <Row>
                <Col>
                <div className={stylesheet.content_columns}>
                <div className={stylesheet.content_heading}><strong>Registered On</strong></div>
                <div className={stylesheet.content_details}> <p>   {selectedUser.Register_date ? selectedUser.Register_date :"N/A"}</p></div>
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
