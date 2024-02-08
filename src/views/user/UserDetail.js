
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import stylesheet from './userdetail.module.css'
import img1 from '../../assets/images/profile.png'

const UserDetail =(props)=> {

    const{close_fun,selectedUser,isOpen}=props
 console.log(selectedUser)
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
     <Modal show={isOpen} onHide={close_fun}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedUser.FirstName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={stylesheet.container}>
            <div className={stylesheet.my_profile}>
             <h6>Profile</h6>
             <img src={selectedUser.profile_photo === "" ? img1 : selectedUser.profile_photo} width='100px' />
              </div>
            <div className={stylesheet.my_details}>
                    <div>
                     <h6>Email</h6>
                        {selectedUser.Email}
                    </div>
                    <div>
                     <h6>Phone</h6>
                        {selectedUser.Mobile}
                    </div>
            </div>
            
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close_fun}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserDetail;
