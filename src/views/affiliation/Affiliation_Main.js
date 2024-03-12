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

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [affiliations_data, setAffiliations_data] = useState({})
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const [file1, setFile1] = useState(null);
  const [img1, setImg1] = useState(null);
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [crop, setCrop] = useState();
  const [crop1, setCrop1] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [file_data, setFile_data] = useState("");
  const [file_data1, setFile_data1] = useState("");





  const handleFile = (e) => {
    // setFile(e.target.files[0]);
    // const [file] = e.target.files;
    // setImg(URL.createObjectURL(file));
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
  const updateAvatar = (imgSrc) => {
    setImg(imgSrc);
    setFile_data(imgSrc);
  };
  const updateAvatar1 = (imgSrc) => {
    setImg1(imgSrc);
    setFile_data1(imgSrc);
    console.log(imgSrc)
  };
  
  function closeModal() {
    setModalOpen(true)
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

  useEffect(() => {
    get_affiliation_data();
  }, []);

  const open_add_fun = () => {
    setIsOpen(true)
    setLink("")
  };

  const close_fun = () => {
    setIsOpen(false);
    setImg(null)
  };
  const close_fun1 = () => {
    setIsOpen1(false);
    setImg1(null)
  };

  const handle_change = (e) => {
    setAffiliations_data({ ...affiliations_data, [e.target.name]: e.target.value })
  };

  const handleChange = (e) => {
    setLink(e.target.value)
  };

  const edit_fun = (user_detail) => {
    setIsOpen1(true);
    setAffiliations_data(user_detail)
  };

  const addAffiliation_fun = (e) => {
    e.preventDefault();
    let user_data = {
      link:link,
      file_data:file_data
    }
    addAffiliation_data(user_data).then((response) => {
      if (response.status === 1) {
        setFile_data("");
        close_fun();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User has been added successfully.",
          showConfirmButton: false,
          timer: 1500
        });
        get_affiliation_data();
      }
       else if (response.status === 0) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Please fill Required fields.",
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  };

  const editAffiliation_fun = (e) => {
    e.preventDefault();
    // let user_data = {
    //   link:affiliations_data.link,
    //   file_data1:file_data1,
    //   id:affiliations_data.id,
    //   file1:file1
    // }
    var formdata = new FormData();
    formdata.append("image", file1)
    formdata.append("link", affiliations_data.link)
    formdata.append("id", affiliations_data.id)
    edit_affliation_data(formdata).then((response) => {
      console.log(response)
      if (response.status === 1) {
        close_fun1();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Life Of Me",
          text: "User profile has been updated successfully.",
          showConfirmButton: false,
          timer: 1500
        });
        get_affiliation_data();
      }
    })
  };

  const delete_fun = (data) => {
    Swal.fire({
      title: "Delete?",
      text: "Are you sure you want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: " rgba(201, 153, 33, 0.733)",
      customClass: {
        confirmButton: 'custom-swal-button',
        cancelButton:'custom-swal-button'
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
              title: "User deleted successfully.",
              showConfirmButton: false,
              timer: 2000
            });
            get_affiliation_data()
          }
        })
      }
    });
  };


  const columns = useMemo(
    () => [
      {
        accessorKey: 'index',
        header: 'SN',
        size: 25,
      },
      {
        accessorKey: 'image',
        header: 'Logo',
        size: 150,
        Cell: tableProps => (
          <img
            style={{ borderRadius: '7px' }}
            src={tableProps.renderedCellValue}
            width={60}
            alt='Logo'
          />
        )
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
            <MdModeEditOutline
              style={{ color: '#078FD7', marginRight: '15px', fontSize: '24px', cursor: 'pointer' }}
              onClick={() => edit_fun(row)}
            />
            <MdDelete
              style={{ color: 'red', fontSize: '24px', cursor: 'pointer' }}
              onClick={() => delete_fun(row)}
            />
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
        header: 'AAA',
        Header: () => <p>Actions</p>,
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
            />
          </div>
        </div>
      }
    </div>
  )
};
export default Affiliation_Main;