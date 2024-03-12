import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import style from './affiliation.module.css'
import profile from '../../assets/images/profile.png'
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

  const { close_fun, isOpen, addAffiliation_fun, img, link, crop, setCrop, handleChange, handleFile, updateAvatar, onImageLoad,} = props

  const abc = (e)=>{
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
      <Modal show={isOpen} onHide={close_fun}>
        <Modal.Header style={{ backgroundColor: 'skyblue' }} closeButton>
          <Modal.Title style={{ alignContent: 'center' }}>Add Affiliation</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: 'whitesmoke' }}>
          <div className={style.container}>
            <form onSubmit={addAffiliation_fun}>
              <Container>
                <div>
                  <Row>
                    <h4>LOGO</h4>
                    <div className={style.profile_img}>
                      <div>
                        <label>
                          <img style={{ cursor: 'grabbing' }} src={img ? img : profile} width={60} alt="" />
                          <input
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
                            accept="image/png"
                            type="file"
                            name='file'
                            onChange={abc}
                            hidden
                          />
                        </label>
                        {img && (
                          <>
                          <div 
                          // className="flex flex-col items-center"
                          style={{width:'100px !important' , height:'250px !important'}}
                          >
                            {!cropDone && (
                            <ReactCrop
                              crop={crop}
                              onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                              circularCrop
                              keepSelection
                              aspect={ASPECT_RATIO}
                              minWidth={MIN_DIMENSION}
                            >
                              <img  
                                ref={imgRef}
                                src={img}
                                alt="Upload"
                                style={{ width:'350px', height:'350px' }}
                                onLoad={onImageLoad}
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
                                      crop,
                                      imgRef.current.width,
                                      imgRef.current.height
                                    )
                                  );
                                  const dataUrl = previewCanvasRef.current.toDataURL("image/jpeg");          
                                  updateAvatar(dataUrl);
                                  setCropDone(true); // Set cropDone to true after cropping
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
                      </div>
                    </div>
                  </Row>
                  <Row>
                    <div style={{ paddingTop: '20px' }}>
                      <div>
                        <label style={{ fontSize: '20px', fontWeight: '500' }} htmlFor="link">Web URL</label>
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
                  </Row>
                </div>
              </Container>
              <div style={{ marginTop: '20px' }}>
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




// import React, { useState, useRef } from 'react';
// import { Modal, Button } from 'react-bootstrap';
// import profile from '../../assets/images/profile.png';
// import { Container, Row } from 'react-bootstrap';
// import ReactCrop, {
//   centerCrop,
//   convertToPixelCrop,
//   makeAspectCrop,
// } from "react-image-crop";
// import "react-image-crop/dist/ReactCrop.css";
// import style from './affiliation.module.css'
// import setCanvasPreview from './SetCanvasPreview';

// const Add_affiliations = (props) => {
//   const ASPECT_RATIO = 1;
//   const MIN_DIMENSION = 150;

//   const [showImageModal, setShowImageModal] = useState(false);
  

//   const imgRef = useRef(null);
//   const previewCanvasRef = useRef(null);

//   const { close_fun, isOpen, addAffiliation_fun, img,crop , setCrop, link, handleChange, handleFile, updateAvatar, onImageLoad } = props;

//   const handleImageModalClose = () => setShowImageModal(false);
//   const handleImageModalShow = () => setShowImageModal(true);

//   return (
//     <div className="modal show" style={{ display: 'block', position: 'initial' }}>
//       <Modal show={isOpen} onHide={close_fun}>
//         <Modal.Header style={{ backgroundColor: 'skyblue' }} closeButton>
//           <Modal.Title style={{ alignContent: 'center' }}>Add Affiliation</Modal.Title>
//         </Modal.Header>
//         <Modal.Body style={{ backgroundColor: 'whitesmoke' }}>
//           <div className={style.container}>
//             <form onSubmit={addAffiliation_fun}>
//               <Container>
//                 <div>
//                   <Row>
//                     <h4>LOGO</h4>
//                     <div>
//                       <label>
//                         <button style={{ border: 'none', backgroundColor: 'whitesmoke' }}>
//                           <img style={{ cursor: 'grabbing' }} src={img ? img : profile} width={60} alt="" onClick={handleImageModalShow} />
//                         </button>
//                         {/* <input
//                           className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
//                           accept="image/png"
//                           type="file"
//                           name='file'
//                           onChange={handleFile}
//                           hidden
//                         /> */}
//                       </label>
//                     </div>
//                   </Row>
//                   <Row>
//                     <div style={{ paddingTop: '20px' }}>
//                       <div>
//                         <label style={{ fontSize: '20px', fontWeight: '500' }} htmlFor="link">Web URL</label>
//                       </div>
//                       <div style={{ paddingTop: '10px' }}>
//                         <input
//                           style={{ width: '75%', height: '5vh', border: '1px solid #757575', borderRadius: '7px', padding: '0 8px' }}
//                           type="text"
//                           name='link'
//                           onChange={handleChange}
//                           value={link}
//                         />
//                       </div>
//                     </div>
//                   </Row>
//                 </div>
//               </Container>
//               <div style={{ marginTop: '20px' }}>
//                 <Button variant="secondary" type='submit'>
//                   Add Affiliation
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </Modal.Body>
//       </Modal>

//       <Modal show={showImageModal} onHide={handleImageModalClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Crop Image</Modal.Title>
//         </Modal.Header>
//         <Modal.Body style={{width:'80%',height:'50vh'}}>
//           <div className="text-center">
//             <input
//               className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
//               accept="image/png"
//               type="file"
//               name='file'
//               onChange={handleFile}
//             />
//             {img && (
//               <div style={{ width: '100px', height: '100px', margin: '20px auto' }}>
//                 <ReactCrop
//                   crop={crop}
//                   onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
//                   circularCrop
//                   keepSelection
//                   aspect={ASPECT_RATIO}
//                   minWidth={MIN_DIMENSION}
//                 >
//                   <img
//                     ref={imgRef}
//                     src={img}
//                     alt="Upload"
//                     style={{ width: '100%', height: '30vh' }}
//                     onLoad={onImageLoad}
//                   />
//                 </ReactCrop>
//               </div>
//             )}
//           </div>
//           <Button
//             className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-sky-500 hover:bg-sky-600"
//             onClick={() => {
//               setCanvasPreview(
//                 imgRef.current, // HTMLImageElement
//                 previewCanvasRef.current, // HTMLCanvasElement
//                 convertToPixelCrop(
//                   crop,
//                   imgRef.current.width,
//                   imgRef.current.height
//                 )
//               );
//               const dataUrl = previewCanvasRef.current.toDataURL("image/jpeg");
//               updateAvatar(dataUrl);
//             }}
//           >
//             Crop Image
//           </Button>
//           <div>
//             {crop && (
//               <canvas
//                 ref={previewCanvasRef}
//                 className="mt-4"
//                 style={{
//                   display: "none",
//                   border: "1px solid black",
//                   objectFit: "contain",
//                   width: 150,
//                   height: 150,
//                 }}
//               />
//             )}
//           </div>
//         </Modal.Body>

//       </Modal>
//     </div>
//   );
// }

// export default Add_affiliations;
