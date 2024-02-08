
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const Notification_modal = (props) => {

    const { isOpen, close_fun, notification_message, handle_change, submit_fun } = props

    return (
        <div>
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={isOpen} onHide={close_fun}>
                <Modal.Header closeButton>
                    <Modal.Title>Send Notification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form style={{textAlign:'center' , paddingBottom:'30px' }} onSubmit={submit_fun}>
                        <div style={{paddingBottom:'15px'}}>
                            <input style={{width:'80%',padding: '12px 20px', margin: '8px 0', display:"inline-block",border: "1px solid #ccc",borderRadius: '4px', boxSizing:'border-box'}} 
                            type="text" 
                            name='notification_message' 
                            value={notification_message} 
                            onChange={handle_change} 
                            />
                        </div>
                        <div>
                            <Button variant='outline-primary' type='submit'>Submit</Button>
                        </div>


                    </form>
                </Modal.Body>
            </Modal>
        </div>
        </div>
    );
}

export default Notification_modal;
