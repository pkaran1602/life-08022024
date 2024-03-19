import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import style from './affiliation.module.css'
import profile from '../../assets/images/affiliation.png'
import setCanvasPreview from './SetCanvasPreview';
import { Container, Row } from 'react-bootstrap';
import { useRef, useState } from 'react';
import ReactCrop, { 
  convertToPixelCrop,
} from "react-image-crop";




const Add_affiliations = (props) => {

  const ASPECT_RATIO = 1;
  const MIN_DIMENSION = 150;

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const [cropDone, setCropDone] = useState(false);
  const [isModal, setIsModal] = useState(false);
 

  const { close_fun, isOpen, addAffiliation_fun, img, link, crop, 
    setCrop, handleChange, handleFile, updateAvatar, onImageLoad, affiliation_errors,imgSelected,handleCloseModal,handleShowModal} = props

  const abc = (e)=>{
    setIsModal(true)
    handleFile(e);
    if(cropDone === true){
      setCropDone(false);
    }
  }


  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal  backdrop="static" // Prevent closing on outside click
        keyboard={false} show={isOpen} style={{marginTop:'60px'}} onHide={close_fun}>
        <Modal.Header style={{ backgroundColor: 'rgba(201, 153, 33, 0.733)' }} closeButton>
          <Modal.Title style={{ alignContent: 'center' }}>Add Affiliation</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: 'whitesmoke' }}>
          <div className={style.container}>
            <form onSubmit={addAffiliation_fun}>
              <Container>
                <div>
                  <Row>
                  <label style={{ fontSize: '22px', fontWeight: '400' }}>Logo</label>
                    <div className={style.profile_img}>
                      <div>
                        <label>
                          <img style={{ cursor: 'grabbing',padding:'10px',borderRadius:'20px' }} src={img ? img : profile} width={75} alt="" />
                          <input
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
                            accept="image/png , image/jpeg"
                            type="file"
                            name='file'
                            onChange={abc}
                            hidden
                          />
                           {imgSelected ? null : <p style={{marginBottom:"0px"}}>Please select Logo</p>}
                        </label>
                       
                      </div>
                      
                    </div>
                  </Row>
                    {affiliation_errors?.file_data &&
                      <p  className='text-danger'>Logo is required.</p>
                      }
                  <Row>
                    <div style={{ paddingTop: '20px' }}>
                      <div>
                        <label style={{ fontSize: '22px', fontWeight: '400' }} htmlFor="link">Web URL</label>
                      </div>
                      <div style={{ paddingTop: '10px' }}>
                        <input className={style.affiliation_input}
                          type="text"
                          name='link'
                          onChange={handleChange}
                          value={link}
                          
                        />
                      </div>
                    </div>
                    {affiliation_errors?.link &&
                      <p  className='text-danger'>{affiliation_errors.link}</p>
                      }
                  </Row>
                </div>
              </Container>
              {affiliation_errors?.response_error &&
                      <p className='my_error'>{affiliation_errors?.response_error}</p>
                      }
              <div style={{ marginTop: '20px' }}>
                <Button variant="secondary" type='submit'>
                  Add Affiliation
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
   
      <div>
          <Modal  backdrop="static" // Prevent closing on outside click
        keyboard={false}  show={isModal} onHide={()=>setIsModal(false)}>
          <Modal.Header closeButton>Crop profile picture</Modal.Header>
            <Modal.Body>
            {img && (
                          <>
                          <div 
                          style={{width:'100%',textAlign:"center"}}
                          >
                            {!cropDone && (
                            <ReactCrop
                              crop={crop}
                              onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                              // circularCrop
                              keepSelection
                              aspect={ASPECT_RATIO}
                              minWidth={MIN_DIMENSION}
                            >
                              <img  
                                ref={imgRef}
                                src={img}
                                alt="Upload"
                                style={{  height:'250px' }}
                                onLoad={onImageLoad}
                              />
                            </ReactCrop>
                            )}
                          </div>
                          <div style={{width:'100%',textAlign:"center"}}>
                            {!cropDone && ( // Render the button only if crop is not done
                              <Button
                             
                                onClick={() => {
                                  setCanvasPreview(
                                    imgRef.current, // HTMLImageElement
                                    previewCanvasRef.current, // HTMLCanvasElement
                                    convertToPixelCrop(
                                      crop,
                                      imgRef.current.width,
                                      imgRef.current.height
                                    )
                                  );
                                  const dataUrl = previewCanvasRef.current.toDataURL("image/jpeg");          
                                  updateAvatar(dataUrl);
                                  setCropDone(true);
                                  setIsModal(false) // Set cropDone to true after cropping
                                }}
                              >
                                Crop Image
                              </Button>
                            )}
                           
                          </div>
                          </>
                        )}
                        {!cropDone && crop && (
                          <canvas
                            ref={previewCanvasRef}
                            className="mt-4"
                            style={{
                              display: "none",
                              border: "1px solid black",
                              objectFit: "contain",
                              width: 150,
                              height: 150,
                            }}
                            />
                        )}
            </Modal.Body>
          </Modal>
      </div>
    </div>
  )
}
export default Add_affiliations;
