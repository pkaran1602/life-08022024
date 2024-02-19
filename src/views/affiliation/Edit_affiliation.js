
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import style from './affiliation.module.css'
import { Container, Row } from 'react-bootstrap';

const Edit_affiliations = (props) => {

  const { close_fun1, isOpen1, editAffiliation_fun,affiliations_data,img1, handle_change,handleFile1 } = props
 
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={isOpen1} onHide={close_fun1}>
        <Modal.Header style={{backgroundColor:'skyblue'}} closeButton>
          <Modal.Title style={{alignContent:'center'}}>Update Affiliation</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:'whitesmoke'}}>
          <div className={style.container}>
          <form onSubmit={editAffiliation_fun}>
            <Container>
            <div>
              <Row>
                <h4>LOGO</h4>
              <div className={style.profile_img}>
                <div>
              <label>
                <img style={{cursor:'grabbing'}} src={img1 ? img1 : affiliations_data.image } width={60} alt="" />
                <input
                  type="file"
                  name='file'
                  onChange={handleFile1}
                  hidden
                />
              </label>
            </div>
            </div>
            </Row>
            <Row>
            <div style={{paddingTop:'20px'}}>
              <div>
                <label style={{fontSize:'20px',fontWeight:'500'}} htmlFor="link">Web URL</label>
              </div>
              <div style={{paddingTop:'10px'}}>
                <input
                style={{width:'75%',height:'5vh' , border:'1px solid #757575', borderRadius:'7px',padding:'0 8px'}}
                  type="text"
                  name='link'
                  onChange={handle_change}
                  value={affiliations_data.link}
                />
              </div>
            </div>
            </Row>
            </div>
            </Container>
            <div style={{marginTop:'20px'}}>
            <Button variant="secondary" type='submit'>
            Update
          </Button>
          </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default Edit_affiliations;
