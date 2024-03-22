
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import style from './affiliation.module.css'
import { Col, Container, Row } from 'react-bootstrap';
import { useRef, useState } from 'react';
import ReactCrop, {
  convertToPixelCrop,
} from "react-image-crop";
import setCanvasPreview from './SetCanvasPreview';


const Edit_affiliations = (props) => {

  const ASPECT_RATIO = 1;
  const MIN_DIMENSION = 10;

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const [isModal, setIsModal] = useState(false);
  const [cropDone, setCropDone] = useState(false);

  const { close_fun1, isOpen1, editAffiliation_fun, profile_img1, crop1, setCrop1, affiliations_data, img1, updateAvatar1, affiliation_errors1, onImageLoad1, handle_change, handleFile1 } = props

  const abc = (e) => {
    setIsModal(true)
    handleFile1(e);
    if (cropDone === true) {
      setCropDone(false);
    }
  }

  const closeModal = () => {
    setIsModal(false)

  }

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={isOpen1} onHide={close_fun1}>
        <Modal.Header style={{ backgroundColor: '#CBB989' }} closeButton>
          <Modal.Title style={{ alignContent: 'center' }}>Edit Affiliation</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: 'whitesmoke' }}>
          <div className={style.container}>
            <form onSubmit={editAffiliation_fun}>
              <Container>
                <div>
                  <Row>
                    <Col className='col-md-4 col-sm-5 col-12 text-start'>
                      {/* <label style={{ fontSize: '22px', fontWeight: '400' }}>Logo</label> */}
                      <div className={style.profile_img} style={{ justifyContent: "center", display: "flex" }}>
                        <div>
                          <label>
                            <p style={{ marginBottom: "10px", fontSize: "14px", fontWeight: "500"  }}>Please select Logo</p>

                            <div className={style.affiliation_img}>
                              <img style={{ cursor: 'grabbing', width: '100%', maxWidth: '150px',  padding: '0px', borderRadius: "5px", marginBottom: '5px' }} src={profile_img1 ? profile_img1 : affiliations_data.image} width={75} alt="" />
                            </div>

                            <input
                              accept="image/png , image/jpeg"
                              type="file"
                              name='file'
                              onChange={abc}
                              hidden
                            />
                          </label>
                        </div>
                      </div>
                    </Col>
                    <Col className='col-md-8 col-sm-7 col-12 text-start'>
                      <div style={{ paddingTop: '25px' }}>
                        <div>
                          <label style={{ fontSize: '18px', fontWeight: '400' }} htmlFor="link">Web URL</label>
                        </div>
                        <div style={{ paddingTop: '10px' }}>
                          <input
                            style={{ width: '100%', height: '45px', border: '1px solid #757575', borderRadius: '7px', padding: '0 8px' }}
                            type="text"
                            name='link'
                            onChange={handle_change}
                            value={affiliations_data.link}

                          />
                          {affiliation_errors1?.link &&
                            <p className='text-danger text-start'>{affiliation_errors1.link}</p>
                          }
                        </div>
                      </div>
                      <div style={{ marginTop: '20px' }}>
                        <Button variant="secondary" type='submit' style={{ padding: '10px 30px' }}>
                          Update
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  
                </div>
              </Container>
             
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <div>
        <Modal backdrop="static" // Prevent closing on outside click
          keyboard={false} show={isModal} onHide={() => setIsModal(false)}>
          <Modal.Header closeButton>Crop profile picture</Modal.Header>
          <Modal.Body>
            {img1 && (
              <>
                <div
                  // className="flex flex-col items-center"
                  style={{ width: '100%', textAlign: "center" }}
                >
                  {!cropDone && (
                    <ReactCrop
                      crop={crop1}
                      onChange={(pixelCrop, percentCrop) => setCrop1(percentCrop)}
                      // circularCrop
                      keepSelection
                      aspect={ASPECT_RATIO}
                      minWidth={MIN_DIMENSION}
                    >
                      <img
                        ref={imgRef}
                        src={img1}
                        alt="Upload"
                        style={{ height: '250px' }}
                        onLoad={onImageLoad1}
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
                            crop1,
                            imgRef.current.width,
                            imgRef.current.height
                          )
                        );
                        const dataUrl = previewCanvasRef.current.toDataURL("image/jpeg");
                        updateAvatar1(dataUrl);
                        setCropDone(true);
                        closeModal()
                      }}
                    >
                      Crop Image
                    </Button>
                  )}

                </div>
              </>
            )}
            {!cropDone && crop1 && (
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
  );
}
export default Edit_affiliations;
