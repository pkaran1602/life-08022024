
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import style from './affiliation.module.css'
import profile from '../../assets/images/profile.png'
import { Container, Row } from 'react-bootstrap';

const Add_affiliations = (props) => {

  const { close_fun,isOpen, addAffiliation_fun,img,link, handleChange,handleFile } = props
 
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={isOpen} onHide={close_fun}>
        <Modal.Header closeButton>
          <Modal.Title style={{alignContent:'center'}}>Add Affiliation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={style.container}>
          <form onSubmit={addAffiliation_fun}>
            <Container>
            <div>
              <Row>
                <h4>LOGO</h4>
              <div className={style.profile_img}>
                <div>
              <label>
                <img src={img ? img : profile} width={60} alt="" />
                <input
                  type="file"
                  name='file'
                  onChange={handleFile}
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
                style={{width:'75%',height:'5vh' , border:'1px solid #757575', borderRadius:'2px'}}
                  type="text"
                  name='link'
                  onChange={handleChange}
                  value={link}
                />
              </div>
            </div>
            </Row>
            </div>
            </Container>
            <div style={{marginTop:'20px'}}>
            <Button variant="secondary" type='submit'>
            Add Affiliation
          </Button>
          </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default Add_affiliations;
