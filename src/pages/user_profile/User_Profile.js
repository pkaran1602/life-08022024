import React, { useEffect, useState,useRef } from 'react'
import stylesheet from './user_profile.module.css'
import { Col, Row } from 'react-bootstrap'
import profile from '../../assets/images/profile.png'
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'
import Card from 'react-bootstrap/Card'
import setCanvasPreview from '../../views/affiliation/SetCanvasPreview';
import { get_admin_data, update_admin_data } from 'src/axios/Api'
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import Modal from 'react-bootstrap/Modal';


const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;


const User_Profile = () => {

  const [user_data, setUser_data] = useState({});
  const [error2, setError2] = useState(false);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);


  const handleCloseModal = () => {
    setShowModal(false);
  }
  const handleShowModal = () => {
    setShowModal(true);
  }
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [error, setError] = useState("");


  const [cropDone, setCropDone] = useState(false);
  const [img, setImg] = useState(null);
  const [affiliation_errors, setAffiliation_errors] = useState({});
  const [file_data, setFile_data] = useState("");
  const [crop, setCrop] = useState();


  const abc = (e)=>{
    handleFile(e);
    if(cropDone === true){
      setCropDone(false);
    }
  }

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150 x 150 pixels.");
          return setImg("");
        }
      });
      setImg(imageUrl);
    });
    reader.readAsDataURL(file);
    setFile(file);
    if (user_data.profile_pic !== profile) {
      setShowModal(true);
    }
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };


  
  const updateAvatar = (imgSrc) => {
    console.log(imgSrc)
    setImg(imgSrc);
    setFile_data(imgSrc);
    delete affiliation_errors.file_data;
    setAffiliation_errors(affiliation_errors);
  };




  // const handleFile = (e) => {
  //   setFile(e.target.files[0])
  //   const [file] = e.target.files
  //   setUser_data({ ...user_data, ["profile_pic"]: URL.createObjectURL(file) })
  //   if (user_data.profile_pic !== profile) {
  //     setShowModal(true);
  //   }
    
  // };

  const handleChange = (e) => {
    validate(e.target.name, e.target.value)
    setUser_data({ ...user_data, [e.target.name]: e.target.value })
  };

  const validate = (name, value) => {
    switch (name) {
      case "name":
        if (value.length ===1) {
          setErrors({ ...errors, name: "Name should be not less than 2 characters" })
        } else if (value.length > 50) {
          setErrors({ ...errors, name: "Name should be not more than 50 character" })
        } else {
          delete errors.name;
          setErrors(errors);
        }
        break;
      case "phone":
        if (value.length === 0) {
          delete errors.phone;
          setErrors(errors);
      } else if (!/^\d+$/.test(value)) {
          setErrors({ ...errors, phone: "Please enter numeric value only in Phone Number" });
      }else {
          delete errors.phone;
          setErrors(errors);
        }
        break;
      case 'email':
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (value.length === 0) {
          // If email field is empty, do not show any error
          delete errors.email;
          setErrors(errors);
        }
       else if (!value.match(validRegex)) {
          setErrors({
            ...errors,
            email: 'Please enter valid email address',
          })
        }
         else {
          delete errors.email
          setErrors(errors)
        }
        break
      default:
        break
    }
  };
  const validate_fun =async ()=>{
    let error = errors;
    if(user_data.name === ""){
      error["name"] ="Name is required."
      setErrors({ ...errors, name: 'Name should be of minimum 2 characters.' });
    }
    if(user_data.phone.length === 0){
      error["phone"] ="Phone number is required."
      setErrors({ ...errors, phone: 'Please enter numeric value only in Phone number' });
    }
    if(user_data.email.length === 0){
      error["email"] ="Email is required."
      setErrors({ ...errors, email: 'Please enter valid email address' });
    }
    return error;
  }


  const submit_fun =async (e) => {
    e.preventDefault()
    // setError2(false)
    const error = await validate_fun();
    setErrors(error);
    // if (user_data.name.length === 0 || user_data.email.length === 0 || user_data.phone.length === 0) {
    //   setErrors("")
    //   setError2(true)
    // }
    if(Object.keys(errors).length ===0){
      var formdata = new FormData();
      formdata.append("profile_pic", file)
      formdata.append("id", user_data.id)
      formdata.append("name", user_data.name)
      formdata.append("email", user_data.email)
      formdata.append("phone", user_data.phone)
      update_admin_data(formdata).then((response) => {
        if (response.status === 1) {
          // user_profile();
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'User profile has been updated successfully.',
            showConfirmButton: false,
            timer: 2000,
          })
          window.location.reload();
        } else{
          console.log("error")
        }
      });
    }
  };

  const user_profile = () => {
    get_admin_data().then((res) => {
      if (res.status === 1) {
        setUser_data(res.data)
      }
    })
  };

  useEffect(() => {
    user_profile();
  }, []);

  return (
    <div className={stylesheet.container}>
      <Card className={stylesheet.card}>
        <Card.Header className={stylesheet.card_header}>
          <div className='d-flex justify-content-between'>
            <div>
            <h5>Update profile details</h5>
            </div>
            <div>
              <p style={{fontSize:'12px',paddingRight:'10px'}}><span className='text-danger'>*</span> Indicates required field</p>
            </div>
            </div> </Card.Header>
        <Card.Body >
          <form onSubmit={submit_fun}>
            <Row>
              <Col md={4}>
                <div className={stylesheet.left}>
                  <div>
                    <div className={stylesheet.profile_img}>

                      <div>
                        <label className={stylesheet.image_label}>
                          Upload picture.
                          <span className="text-danger" style={{ fontSize: '20px' }}>
                            *
                          </span>
                        </label>
                        <label>
                          <img src={user_data.profile_pic !== "" ? user_data.profile_pic : profile} alt="" width="130px" />
                          <input accept="image/png , image/jpeg" type="file" name="file"  onChange={abc } hidden />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={8}>
                <div className={stylesheet.right}>
                  <div>
                    <div>
                      <label for="name" style={{ fontSize: '14px', color: '#757575' }}>
                        Name
                        <span className="text-danger" style={{ fontSize: '20px' }}>
                          *
                        </span>
                      </label>
                      <div>
                        <input
                          style={{
                            border: 'none',
                            borderBottom: '1px solid #757575',
                            outline: 'none',
                            width: '80%'
                          }}
                          type="text"
                          name="name"
                          value={user_data.name}
                          onChange={handleChange}

                        />
                      </div>
                    </div>
                    {errors && errors.name && (
                      <p className="text-danger">{errors.name}</p>
                    )}
                    <div>
                      {error2 && user_data.name.length === 0 ?
                        <label className="text-danger">Name is required field</label>
                        : ""
                      }
                    </div>
                    <div>
                      <label for="email" style={{ fontSize: '14px', color: '#757575' }}>
                        Email
                        <span
                          className="text-danger"
                          style={{ fontSize: '20px', marginLeft: '2px' }}
                        >
                          *
                        </span>
                      </label>
                      <div>
                        <input
                          style={{
                            border: 'none',
                            borderBottom: '1px solid #757575',
                            outline: 'none',
                            width: '80%'
                          }}

                          type="email"
                          name="email"
                          value={user_data.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    {errors && errors.email && <p className="text-danger">{errors.email}</p>}
                    <div>
                      {error2 && user_data.email.length === 0 ?
                        <label className="text-danger">Email is required field </label>
                        : ""
                      }
                    </div>

                    <div>
                      <label for="phone" style={{ fontSize: '14px', color: '#757575' }}>
                        Phone Number
                        <span
                          className="text-danger"
                          style={{ fontSize: '20px', marginLeft: '2px' }}
                        >
                          *
                        </span>
                      </label>
                      <div>
                        <input

                          style={{
                            border: 'none',
                            borderBottom: '1px solid #757575',
                            outline: 'none',
                            width: '80%'
                          }}
                          type="tel"
                          name="phone"
                          value={user_data.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    {errors && errors.phone && <p className="text-danger">{errors.phone}</p>}
                    <div>
                      {error2 && user_data.phone.length === 0 ?
                        <label className="text-danger">Phone Number is required field</label>
                        : ""
                      }
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <div className={stylesheet.update_btn}>
              <Button type='submit'>Save changes</Button>
            </div>
          </form>
        </Card.Body>
      </Card>
      {user_data.profile_pic !== profile &&(
      <div>
      <Modal style={{}} centered show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>Crop Image</Modal.Header>
      <Modal.Body style={{height:'70vh'}}>
        {img && (
                          <>
                          <div 
                          style={{width:'100px !important' , height:'250px !important'}}
                          >
                            {!cropDone && (
                            <ReactCrop
                            // style={{width:'200px', height:'200px'}}
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
                              style={{margin:"7px 150px"}}
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
      </Modal.Body>
      </Modal>
      </div>
)}
    </div>
  )
}

export default User_Profile
