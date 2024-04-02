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
import My_Loader from 'src/components/loader/My_Loader'
import { useDispatch } from 'react-redux'
import { token_expire } from 'src/redux/actions/authAction'
import { NumberFormatter } from 'react-number-formatter'


const ASPECT_RATIO = 1;
const MIN_DIMENSION = 50;


const User_Profile = () => {

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const [user_data, setUser_data] = useState({});
  const [error2, setError2] = useState(false);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);


  const handleCloseModal = () => {
    handleFileSelect();
    setShowModal(false);
  };
  const handleShowModal = () => {
    setShowModal(true);
  };
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [error, setError] = useState("");

  
  const [cropDone, setCropDone] = useState(false);
  const [img, setImg] = useState(null);
  const [affiliation_errors, setAffiliation_errors] = useState({});
  const [file_data, setFile_data] = useState("");
  const [crop, setCrop] = useState();
  const [imgSelected, setImgSelected] = useState(false);
  const [isloading, setisLoading] = useState(false)


  const abc = (e)=>{
    handleFile(e);
    if(cropDone === true){
      setCropDone(false);
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current.value = '';
  };

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
      setImgSelected(true);
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
    setUser_data({ ...user_data, profile_pic: imgSrc });
    setImg(imgSrc);
    setFile_data(imgSrc);
    delete affiliation_errors.file_data;
    setAffiliation_errors(affiliation_errors);
  };

  const handleChange = (e) => {
    validate(e.target.name, e.target.value)
    const { name, value } = e.target;
    console.log(name,value)
    setUser_data({ ...user_data, [name]: value });

  };

  const validate = (name, value) => {
    switch (name) {
      case "name":
        if (value.length === 0) {
          setErrors({});
        }
       else if (!/^[a-zA-Z\s\p{L}]+$/u.test(value)) {
          setErrors({ ...errors, name: "Name should contain only alphabets" });
        }
        else if (value.length <2) {
          setErrors({ ...errors, name: "Name should not be less than 2 characters" })
        } else if (value.length > 50) {
          setErrors({ ...errors, name: "Name should not be more than 50 character" })
        } else {
          delete errors.name;
          setErrors(errors);
        }
        break;
     
        case 'email':
          var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.com$/
          if (value.length === 0) {
            // If email field is empty, do not show any error
            delete errors.email;
            setErrors(errors);
          } else if (!value.match(validRegex)) {
            setErrors({
              ...errors,
              email: 'Please enter a valid email address',
            })
          } else {
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
      error["phone"] ="Phone Number is required."
      setErrors({ ...errors, phone: 'Please enter numeric value only in Phone Number' });
    }
    if(user_data.email.length === 0){
      error["email"] ="Email is required."
      setErrors({ ...errors, email: 'Please enter valid email address' });
    }
    return error;
  }


  const submit_fun =async (e) => {
    e.preventDefault()
    const error = await validate_fun();
    setErrors(error);
    if(Object.keys(errors).length ===0){
      let Myuser_data = {
        id : user_data.id,
        name : user_data.name,
        email : user_data.email,
        phone : user_data.phone,
        file_data : file_data
      }
      setisLoading(true);
      update_admin_data(Myuser_data).then((response) => {
        if (response.status === 1) {
        setisLoading(false);
         
          window.location.reload();
        } else if (response.status === 4) {
          dispatch(token_expire());
        }
         else{
          setisLoading(false);
        }
       
      });
    }
  };

  const phoneFun = (number)=>{
    setUser_data({ ...user_data, ["phone"]: number });
     
      if(number.length < 12 && number.length !== 0){
        setErrors({ ...errors, phone: 'Phone Number should be of minimum nine characters.' });
      }
      else  if (number.length === 0) {
        delete errors.phone;
        setErrors(errors);
      }
      else {
              delete errors.phone;
              setErrors(errors);
            }
      console.log(number.length)
  };


  const user_profile = () => {
    get_admin_data().then((res) => {
      if (res.status === 1) {
        setUser_data(res.data)
      }
      else if (res.status === 4) {
        dispatch(token_expire());
      }
    })
  };




  useEffect(() => {
    user_profile();
  }, []);

  return (
    <div>
{isloading ? <My_Loader /> :
  
    <div className={stylesheet.container}>
      <Card className={stylesheet.card}>
        <Card.Header className={stylesheet.card_header}>
          <div className='d-flex justify-content-between'>
            <div>
            <h5 style={{margin:'5px'}}>Update Profile Details</h5>
            </div>
            <div>
              <p style={{fontSize:'12px',paddingRight:'10px'}}><span className='text-danger'>*</span> Indicates required field</p>
            </div>
            </div> </Card.Header>
        <Card.Body >
          <form onSubmit={submit_fun}>
            <div className='row justify-content-center align-items-center'>
                <div className="col-md-3">
                 
                    <div className={stylesheet.profile_img}>

                      <div>
                        <label className={stylesheet.image_label} style={{ fontSize: '14px', color: '#757575' }}>
                          Profile Picture
                          <span className="text-danger" style={{ fontSize: '20px',marginTop:"-7px"}}>
                            *
                          </span>
                        </label>
                        <label>
                          <img src={user_data.profile_pic !== "" ? user_data.profile_pic : profile} title='Select Profile Picture' alt="" width="130px" />
                          <input accept="image/png , image/jpeg,image/webp"  ref={fileInputRef} type="file" name="file" onChange={abc} hidden />
                        </label>
                      </div>
                   
                  </div>
                </div>
              
                <div className="col-md-7">
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
                        className='form-control'
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
                         className='form-control'
                          // style={{
                          //   border: 'none',
                          //   borderBottom: '1px solid #757575',
                          //   outline: 'none',
                          //   width: '80%'
                          // }}

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
                          <NumberFormatter
                          format={"+61 ### ### #### "}
                          placeholder='+61 xxx xxx xxx'
                          type='num'
                          name='phone'
                          value={user_data.phone}
                          getValue={(n) => phoneFun(n)}
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
                </div>
            <div className={stylesheet.update_btn}>
              <Button type='submit'>Update</Button>
            </div>
          </form>
        </Card.Body>
      </Card>
      {user_data.profile_pic !== profile &&(
      <div>
      <Modal backdrop="static" // Prevent closing on outside click
        keyboard={false} centered show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>Crop profile picture</Modal.Header>
      <Modal.Body>
        {img && (
                          <>
                          <div 
                          style={{width:'100%',textAlign:"center"}}
                          >
                            {!cropDone && (
                            <ReactCrop
                            // style={{width:'200px', height:'200px'}}
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
                                style={{ height:'250px'}}
                                onLoad={onImageLoad}
                              />
                            </ReactCrop>
                            )}
                          </div>
                          <div style={{width:'100%',textAlign:"center"}}>
                            {!cropDone && ( 
                              <Button
                              
                                onClick={() => {
                                  setCanvasPreview(
                                    imgRef.current, 
                                    previewCanvasRef.current, 
                                    convertToPixelCrop(
                                      crop,
                                      imgRef.current.width,
                                      imgRef.current.height
                                    )
                                  );
                                  const dataUrl = previewCanvasRef.current.toDataURL("image/jpeg");          
                                  updateAvatar(dataUrl);
                                  setCropDone(true); 
                                  handleCloseModal()
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
  }
    </div>
  )
}

export default User_Profile
