
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import style from './affiliation.module.css'
import { Container, Row } from 'react-bootstrap';
import { useRef, useState } from 'react';
import ReactCrop, { 
  convertToPixelCrop,
} from "react-image-crop";
import setCanvasPreview from './SetCanvasPreview';


const Edit_affiliations = (props) => {

  const ASPECT_RATIO = 1;
  const MIN_DIMENSION = 150;

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  
  const [cropDone, setCropDone] = useState(false);

  const { close_fun1, isOpen1, editAffiliation_fun,crop1,setCrop1,affiliations_data,img1,updateAvatar1,onImageLoad1, handle_change,handleFile1 } = props
 
  const abc = (e)=>{
    handleFile1(e);
    if(cropDone === true){
      setCropDone(false);
    }
  }

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={isOpen1} onHide={close_fun1}>
        <Modal.Header style={{backgroundColor:'rgba(201, 153, 33, 0.733)'}} closeButton>
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
                <img style={{cursor:'grabbing'}} src={img1 ? img1 : affiliations_data.image } width={65} alt="" />
                <input
                accept="image/png , image/jpeg"
                  type="file"
                  name='file'
                  onChange={abc}
                  hidden
                />
              </label>
              {img1 && (
                          <>
                          <div 
                          // className="flex flex-col items-center"
                          style={{width:'100px !important' , height:'250px !important'}}
                          >
                            {!cropDone && (
                            <ReactCrop
                              crop={crop1}
                              onChange={(pixelCrop, percentCrop) => setCrop1(percentCrop)}
                              circularCrop
                              keepSelection
                              aspect={ASPECT_RATIO}
                              minWidth={MIN_DIMENSION}
                            >
                              <img  
                                ref={imgRef}
                                src={img1}
                                alt="Upload"
                                style={{ width:'350px', height:'350px' }}
                                onLoad={onImageLoad1}
                              />
                            </ReactCrop>
                            )}
                          </div>
                          <div>
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
                                  setCropDone(true); // Set cropDone to true after cropping
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
                style={{width:'75%',height:'6vh' , border:'1px solid #757575', borderRadius:'7px',padding:'0 8px'}}
                  type="text"
                  name='link'
                  onChange={handle_change}
                  value={affiliations_data.link}
                  placeholder='Enter URL'
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
