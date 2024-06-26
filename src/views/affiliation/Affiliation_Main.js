import React, { useEffect, useRef, useState } from 'react'
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import { Button } from 'react-bootstrap'
import Add_affiliations from './Add_affiliations'
import { MaterialReactTable } from 'material-react-table';
import { addAffiliation_data, edit_affliation_data, get_affiliation_list, remove_affiliation_data, reorder_data } from 'src/axios/Api'
import { useMemo } from 'react';
import { useMaterialReactTable, } from 'material-react-table';
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2'
import Edit_affiliations from './Edit_affiliation'
import { token_expire } from 'src/redux/actions/authAction'
import { useDispatch } from 'react-redux'
import My_Loader from 'src/components/loader/My_Loader';

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const Affiliation_Main = () => {

  const fileInputRef1 = useRef(null);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [affiliations_data, setAffiliations_data] = useState({})
  const [img, setImg] = useState(null);
  const [profile_img, setProfile_img] = useState(null);
  const [file, setFile] = useState(null);
  const [file1, setFile1] = useState(null);
  const [img1, setImg1] = useState(null);
  const [profile_img1, setProfile_img1] = useState(null);
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [crop, setCrop] = useState();
  const [crop1, setCrop1] = useState();
  const [file_data, setFile_data] = useState("");
  const [file_data1, setFile_data1] = useState("");
  const [affiliation_errors, setAffiliation_errors] = useState({});
  const [affiliation_errors1, setAffiliation_errors1] = useState({});
  const [imgSelected, setImgSelected] = useState(false);


  /********* ADD AFFILIATION *********/


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
    setProfile_img(imgSrc)
    setImg(imgSrc);
    setFile_data(imgSrc);
    delete affiliation_errors.file_data;
    setAffiliation_errors(affiliation_errors);
  };



  /************ EDIT AFFILIATION **********/



  const onImageLoad1 = (e) => {
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
    setCrop1(centeredCrop);
  };

  const updateAvatar1 = (imgSrc) => {
    setProfile_img1(imgSrc)
    setImg1(imgSrc);
    setFile_data1(imgSrc);
    console.log(imgSrc)
  };

  const handleFile1 = (e) => {
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
          return setImg1("");
        }
      });
      setImg1(imageUrl);
    });
    reader.readAsDataURL(file);
    setFile1(file);
  };



  /************ API ***********/


  const get_affiliation_data = () => {
    get_affiliation_list().then((response) => {
      setIsLoading(false);
      if (response.status === 1) {
        const dataWithIndex = response.data.map((item, index) => ({
          ...item,
          index: index + 1,
        }));
        setData(dataWithIndex)
      } else if (response.status === 4) {
        dispatch(token_expire());
      }
    })
  };

  const addAffiliation_fun = (e) => {
    e.preventDefault();
    const error = validate();
    setAffiliation_errors(error);
    if (Object.keys(error).length === 0) {
      let user_data = {
        link: link,
        file_data: file_data
      }
      addAffiliation_data(user_data).then((response) => {
        if (response.status === 1) {
          setFile_data("");
          close_fun();
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Affiliation has been added successfully.",
            showConfirmButton: false,
            timer: 2000
          });
          get_affiliation_data();
        }
        else if (response.status === 0) {
          setAffiliation_errors({ ...affiliation_errors, response_error: response.message });
        }
        else if (response.status === 4) {
          dispatch(token_expire());
        }
      })
    }
  };

  const editAffiliation_fun = (e) => {
    e.preventDefault();
    const error = validate1();
    setAffiliation_errors1(error);
    if (Object.keys(error).length === 0) {
      let user_data = {
        link: affiliations_data.link,
        file_data: file_data1,
        id: affiliations_data.id,
      }
      edit_affliation_data(user_data).then((response) => {
        if (response.status === 1) {
          setFile_data1("")
          close_fun1();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Life Of Me",
            text: "Affiliate has been updated successfully.",
            showConfirmButton: false,
            timer: 2000
          });
          get_affiliation_data();
        }
        else if (response.status === 4) {
          dispatch(token_expire());
        }
      })
    }
  };

  const delete_fun = (data) => {
    Swal.fire({
      title: "Delete?",
      text: "Are you sure you want to delete this affiliate?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: " #CBB989",
      customClass: {
        confirmButton: 'custom-swal-button',
        cancelButton: 'custom-swal-button'
      },
      cancelButtonColor: "#757575",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        remove_affiliation_data(data.id).then((response) => {
          if (response.status === 1) {
            Swal.fire({
              position: "center",
              icon: "success",
              text: "Affiliation has been deleted successfully.",
              showConfirmButton: false,
              timer: 2000
            });
            get_affiliation_data()
          }
          else if (response.status === 4) {
            dispatch(token_expire());
          }
        })
      }
    });
  };


  /*********** VALIDATION ***********/


  const handle_change = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    if (name === 'link') {
        if (!value.trim()) {
            setAffiliation_errors1({});
        } else if (value.trim().length < 8) {
            setAffiliation_errors1({ ...affiliation_errors1, [name]: "Web URL must be at least 8 characters long." });
        } else if (!/^https:\/\/.+/i.test(value.trim())) {
            // If "https://" is not present, prepend it to the link
            updatedValue = 'https://' + value.trim();
        } else {
            const { link, ...restErrors } = affiliation_errors1;
            setAffiliation_errors1(restErrors);
        }
    }
    setAffiliations_data({ ...affiliations_data, [name]: updatedValue });
};


const handleChange = (e) => {
  const { name, value } = e.target;
  let updatedValue = value;

  if (name === 'link') {
    if (!value.trim()) {
      setAffiliation_errors({ ...affiliation_errors, [name]: "" });
    } else if (value.trim().length < 8) {
      setAffiliation_errors({ ...affiliation_errors, [name]: "Web URL must be at least 8 characters long." });
    } else if (!/^https:\/\/.+/i.test(value.trim())) {
      // If "https://" is not present, prepend it to the link
      updatedValue = 'https://' + value.trim();
    } else {
      const { link, ...restErrors } = affiliation_errors;
      setAffiliation_errors(restErrors);
    }
  } else {
    if (!value.trim()) {
      setAffiliation_errors({});
    }
  }

  setLink(updatedValue);
};


  const validate = () => {
    let error = {};
    if (!link.trim()) {
      error["link"] = "Web URL is required.";
    } else if (link.trim().length < 8) {
      error["link"] = "Web URL must be at least 8 characters long.";
    }  else if (!/^https:\/\/.+/i.test(link.trim())) {
      error["link"] = "Invalid URL. Please enter a URL starting with 'https://'.";
  }
    if (file_data === "") {
      error["file_data"] = "Please select file"
    }
    return error;
  };
  const validate1 = () => {
    let error = {};
    const { link } = affiliations_data;
    if (!link.trim()) {
        error["link"] = "Web URL is required.";
    } else if (link.trim().length < 8) {
        error["link"] = "Web URL must be at least 8 characters long.";
    } else if (!/^https:\/\/.+/i.test(link.trim())) {
        error["link"] = "Invalid URL. Please enter a URL starting with 'https://'.";
    }
    return error;
};


  const edit_fun = (user_detail) => {
    setIsOpen1(true);
    setAffiliations_data(user_detail)
  };

  useEffect(() => {
    get_affiliation_data();
  }, []);

  const open_add_fun = () => {
    setIsOpen(true)
    setLink("")
  };

  const close_fun = () => {
    setIsOpen(false);
    setImg(null);
    setProfile_img(null);
  };

  const close_fun1 = () => {
    setIsOpen1(false);
    setImg1(null);
    setProfile_img1(null);
  };


  const columns = useMemo(
    () => [
      {
        accessorKey: 'index',
        header: 'ID',
        size: 15,
      },
      {
        accessorKey: 'image',
        header: 'Logo',
        size: 50,
        Cell: tableProps => (
          <a href={tableProps.renderedCellValue} target='_blank'>
          <img
            style={{ height: '55px', borderRadius: '4px' }}
            src={tableProps.renderedCellValue}
            width={60}
            alt='Logo'
          />
           </a>
        ),
        enableColumnFilter: false,
      },
      {
        accessorKey: 'link',
        header: 'Web URL',
        size: 200,
        Cell: tableProps => (
          <a style={{ textDecoration: 'none' }} href={tableProps.row.original.link} target="_blank" rel="noopener noreferrer">
            {tableProps.row.original.link}
          </a>
        )

      },
      {
        accessorFn: (row) =>
          <>
            <Button
              style={{ color: 'black', marginRight: "10px", marginTop: "3px",  marginBottom: "3px"  }}
              onClick={() => edit_fun(row)}
            >Edit</Button>
            <Button
              style={{ color: 'black', }}
              onClick={() => delete_fun(row)}
            >Delete</Button>
            <style>{`
                .custom-swal-button {
                    border: none !important;
                }
                .custom-swal-button:hover,
                .custom-swal-button:focus {
                    border: none !important;
                    box-shadow: none !important;
                }
            `}</style>
          </>,
        id: 'Button',
        header: 'Actions',
        Header: () => <p style={{ marginLeft: "35px" }}>Actions</p>,
        enableColumnFilter: false,
        size: 100,
      },
    ],
    [],
  );


  const table = useMaterialReactTable({
    autoResetPageIndex: false,
    enableColumnActions: false,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    columns,
    data,
    enableRowOrdering: true,
    enableSorting: false,
    muiTablePaperProps: {
      sx: {
        borderRadius: '8px',
         boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      },
    },
    muiRowDragHandleProps: ({ table }) => ({
      onDragEnd: () => {
        const { draggingRow, hoveredRow } = table.getState();
        if (hoveredRow && draggingRow) {
          data.splice(
            hoveredRow.index,
            0,
            data.splice(draggingRow.index, 1)[0],
          );
          for (let i = 0; i < data.length; i++) {
            data[i].order_id = i + 1;
          }
          setData([...data]);
          reorder_data({ affiliations: data }).then((response) => {
            if (response.status === 1) {
              get_affiliation_data();
            }
          })
        }
      },
    }),
  });

  return (
    <div>
      {isLoading &&
        <My_Loader />
      }
      {!isLoading &&
        <div style={{ backgroundColor: 'white', paddingTop: '20px' }}>
          <div style={{ padding: '30px', paddingTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <span style={{ color: '#424242', fontSize: '24px', fontWeight: '500' }}>
                Affiliations
              </span>
            </div>
            <div>
              <Button variant='outline-primary' onClick={open_add_fun} >Add Affiliation</Button>
            </div>
          </div>
          <div style={{ padding: '30px', paddingTop: '10px' }}>
            <MaterialReactTable table={table} />
          </div>
          <div>
            <Add_affiliations
              close_fun={close_fun}
              isOpen={isOpen}
              addAffiliation_fun={addAffiliation_fun}
              img={img}
              link={link}
              open_add_fun={open_add_fun}
              handleChange={handleChange}
              handleFile={handleFile}
              setImg={setImg}
              updateAvatar={updateAvatar}
              onImageLoad={onImageLoad}
              crop={crop}
              setCrop={setCrop}
              affiliation_errors={affiliation_errors}
              imgSelected={imgSelected}
              profile_img={profile_img}
            />
          </div>
          <div>
            <Edit_affiliations
              close_fun1={close_fun1}
              isOpen1={isOpen1}
              affiliations_data={affiliations_data}
              editAffiliation_fun={editAffiliation_fun}
              img1={img1}
              handleFile1={handleFile1}
              handle_change={handle_change}
              updateAvatar1={updateAvatar1}
              onImageLoad1={onImageLoad1}
              crop1={crop1}
              setCrop1={setCrop1}
              affiliation_errors1={affiliation_errors1}
              profile_img1={profile_img1}
              fileInputRef1={fileInputRef1}

            />
          </div>
        </div>
      }
    </div>
  )
};
export default Affiliation_Main;