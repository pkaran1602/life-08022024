import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Add_affiliations from './Add_affiliations'
import Affiliation from './Affiliation'
import { addAffiliation_data, edit_affliation_data, get_affiliation_list, remove_affiliation_data } from 'src/axios/Api'
import { useMemo } from 'react';
import { useMaterialReactTable, } from 'material-react-table';
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2'
import Edit_affiliations from './Edit_affiliation'

const Affiliation_Main = () => {

  const [data, setData] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [affiliations_data, setAffiliations_data] = useState({})
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const [file1, setFile1] = useState(null);
  const [img1, setImg1] = useState(null);
  const [link, setLink] = useState("");

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  };

  const handleFile1 = (e) => {
    setFile1(e.target.files[0]);
    const [file1] = e.target.files;
    setImg1(URL.createObjectURL(file1));
  };

  const get_affiliation_data = () => {
    get_affiliation_list().then((response) => {
      if(response.status ===1){
        const dataWithIndex = response.data.map((item, index) => ({
          ...item,
          index: index + 1,
        }));
        setData(dataWithIndex)
      }
    })
  };

  useEffect(() => {
    get_affiliation_data();
  }, []);

  const open_add_fun = () => {
    setIsOpen(true)
    setLink(null)
  }

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
    e.preventDefault()
    var formdata = new FormData();
    formdata.append("image", file)
    formdata.append("link", link)
    addAffiliation_data(formdata).then((response) => {
      if (response.status === 1) {
        close_fun();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Details has been Added",
          showConfirmButton: false,
          timer: 1500
        });
        get_affiliation_data();
      }
    })

  };

  const editAffiliation_fun = (e) => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("image",file1)
    formdata.append("link",affiliations_data.link)
    formdata.append("id", affiliations_data.id)
    edit_affliation_data(formdata).then((response)=>{
      if(response.status === 1){
        close_fun1();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Details has been Added",
          showConfirmButton: false,
          timer: 1500
        });
        get_affiliation_data();
      }
    })


  };

  const delete_fun = (data) => {
    remove_affiliation_data(data.id).then((response) => {
      if (response.status === 1) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Details has been Removed",
          showConfirmButton: false,
          timer: 1500
        });
        get_affiliation_data()
      }
    })
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
      },
      {
        accessorFn: (row) =>
          <>
            <MdModeEditOutline
              style={{ color: '#078FD7', fontSize: '20px', cursor: 'pointer' }}
              onClick={() => edit_fun(row)}
            />
            <MdDelete
              style={{ color: 'red', fontSize: '20px', cursor: 'pointer' }}
              onClick={() => delete_fun(row)}
            />
          </>,
        id: 'Button',
        header: 'AAA',
        Header: () => <i>Actions</i>,
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
          setData([...data]);
        }
      },
    }),
  });

  return (
    <div>
      <div style={{ paddingBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <span style={{ color: '#424242', fontSize: '24px', fontWeight: '500' }}>
            Affilations
          </span>
        </div>
        <div>
          <Button variant='outline-primary' onClick={open_add_fun} >Add Affiliations</Button>
        </div>
      </div>
      <div>
        <Affiliation
          table={table}
        />
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
        />
      </div>
    </div>
  )
}
export default Affiliation_Main;