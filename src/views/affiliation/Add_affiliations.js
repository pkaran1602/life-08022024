import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import style from './affiliation.module.css'
import profile from '../../assets/images/affiliation.png'
import setCanvasPreview from './SetCanvasPreview';
import { Col, Container, Row } from 'react-bootstrap';
import { useRef, useState } from 'react';
import ReactCrop, {
  convertToPixelCrop,
} from "react-image-crop";




const Add_affiliations = (props) => {

  const fileInputRef = useRef(null);
  const ASPECT_RATIO = 1;
  const MIN_DIMENSION = 10;

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const [cropDone, setCropDone] = useState(false);
  const [isModal, setIsModal] = useState(false);


  const { close_fun, isOpen, addAffiliation_fun, img, link, crop,
    setCrop, handleChange, handleFile, updateAvatar, onImageLoad, profile_img, affiliation_errors, } = props

  const abc = (e) => {
    setIsModal(true)
    handleFile(e);
    if (cropDone === true) {
      setCropDone(false);
    }
  };
  const handleFileSelect = () => {
    fileInputRef.current.value = '';
  };

  const closeModal = () => {
    handleFileSelect()
    setIsModal(false)
  };

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal backdrop="static" // Prevent closing on outside click
        keyboard={false} show={isOpen} style={{ marginTop: '60px' }} onHide={close_fun}>
        <Modal.Header style={{ backgroundColor: '#CBB989' }} closeButton>
          <Modal.Title style={{ alignContent: 'center' }}>Add Affiliation</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#fff', borderRadius: "15px" }}>
          <div className={style.container}>
            <form onSubmit={addAffiliation_fun}>
              <Container style={{ paddingTop: '25px' }}>
                <div>
                  <Row>
                    <Col className='col-md-4 col-sm-5 col-12 text-start'>
                      {/* <label style={{ fontSize: '22px', fontWeight: '400' }}>Logo</label> */}
                      <div className={style.profile_img} style={{ justifyContent: "center", display: "flex" }}>
                        <div>
                          <label>
                            {/* <p style={{ marginBottom: "10px", fontSize: "14px", fontWeight: "500"  }}>Please select Logo</p> */}

                            <div className={style.affiliation_img}>
                              <img style={{ cursor: 'grabbing', width: '100%', maxWidth: '150px', padding: '0px', borderRadius: "5px", marginBottom: '5px' }} src={profile_img ? profile_img : profile} width={75} alt="" />
                            </div>

                            <input
                              accept="image/png , image/jpeg"
                              ref={fileInputRef}
                              type="file"
                              name='file'
                              onChange={abc}
                              hidden
                            />
                          </label>
                        </div>
                      </div>
                      {affiliation_errors?.file_data &&
                        <p className='text-danger'>Logo is required.</p>
                      }
                    </Col>
                    <Col className='col-md-8 col-sm-7 col-12 text-start'>
                      <div style={{ paddingTop: '0px' }}>
                        <div>
                          <label style={{ fontSize: '16px', fontWeight: '400' }} htmlFor="link">Web URL</label>
                        </div>
                        <div style={{ paddingTop: '5px' }}>
                          <input
                            style={{ width: '100%', height: '40px', border: '1px solid #757575', borderRadius: '7px', padding: '0 8px' }}
                            type="text"
                            name='link'
                            onChange={handleChange}
                            value={link}

                          />
                          {affiliation_errors?.link &&
                            <p className='text-danger text-start'>{affiliation_errors.link}</p>
                          }
                        </div>
                      </div>
                      <div style={{ marginTop: '15px' }}>
                        <Button variant="secondary" type='submit' style={{ padding: '7px 25px' }}>
                          Add Affiliation
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
              {affiliation_errors?.response_error &&
                <p className='my_error'>{affiliation_errors?.response_error}</p>
              }
            </form>
          </div>
        </Modal.Body>
      </Modal>

      <div>
        <Modal backdrop="static" // Prevent closing on outside click
          keyboard={false} show={isModal} onHide={closeModal}>
          <Modal.Header closeButton>Crop profile picture</Modal.Header>
          <Modal.Body>
            {img && (
              <>
                <div
                  style={{ width: '100%', textAlign: "center" }}
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
                        style={{ height: '250px' }}
                        onLoad={onImageLoad}
                      />
                    </ReactCrop>
                  )}
                </div>
                <div style={{ width: '100%', textAlign: "center" }}>
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
                        closeModal() // Set cropDone to true after cropping
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
