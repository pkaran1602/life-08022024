
import React from 'react'
import { useEffect, useMemo, useState } from 'react';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { get_users_list } from 'src/axios/Api';
import { useMaterialReactTable } from 'material-react-table';
import UserDetail from './UserDetail';
import { FaEye } from "react-icons/fa";
import { Button } from 'react-bootstrap';
import { MaterialReactTable } from 'material-react-table';
import { token_expire } from 'src/redux/actions/authAction';
import { useDispatch } from 'react-redux';
import My_Loader from 'src/components/loader/My_Loader';

const User = () => {

  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const handleExportData = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
    const dataWithNAs = data.map(item => ({
      ...item,
      FirstName: item.FirstName || "N/A",
    MiddleName: item.MiddleName || "N/A",
    LastName: item.LastName || "N/A",
    Email: item.Email || "N/A",
    BirthDate: item.BirthDate || "N/A",
    })).map(({ profile_photo, Gender,index, ...rest }) => rest);
    const csv = generateCsv(csvConfig)(dataWithNAs);
    const fileName = `Users-${formattedDate}.csv`;
    download(fileName, csv);
  };

  const download = (fileName, content) => {
    const blob = new Blob([content], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  useEffect(() => {
    get_users_list().then((response) => {
      setIsLoading(false);
      if (response.status === 1) {
        const dataWithIndex = response.data.map((item, index) => ({
          ...item,
          FirstName: item.FirstName || "N/A",
          Email: item.Email || "N/A",
          Mobile: item.Mobile ==='' ? "N/A" : "+61 " + item.Mobile  ,
          index: index + 1,
        }));
        setData(dataWithIndex);
      } else if (response.status === 4) {
        dispatch(token_expire());
      } else {
        // When there's no data, set data to NA
        setData("N/A");
      }
    });

  }, [])

  const view_fun = (user_detail) => {
    setIsOpen(true);
    setSelectedUser(user_detail);
  };

  const close_fun = () => {
    setIsOpen(false);
    setSelectedUser({});
  };

  const edit_fun = () => {
    alert("edit_fun")
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'index',
        header: 'SN',
        size: 50,
        // cell: row=>(user_id())

      },
      {
        accessorKey: 'FirstName',
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'Email',
        header: 'Email',
        size: 150,
      },
      {
        accessorKey: 'Mobile',
        header: 'Mobile',
        size: 200,
        enableSorting: false,
      },
      {
        accessorFn: (row) =>
          <>
            <FaEye
              style={{ color: '#078FD7', fontSize: '20px', cursor: 'pointer' }}
              onClick={() => view_fun(row)}
            />
          </>,
        id: 'Button',
        header: 'AAA',
        Header: () => <i>Actions</i>,
        enableSorting: false,
      },
    ],
  );

  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
    useTextDelimiter: true, // Added to handle "N/A" correctly
    textDelimiter: '"', // Added to handle "N/A" correctly
    undefinedString: "N/A", // Added to handle "N/A" correctly
  });
  const table = useMaterialReactTable({
    enableColumnActions: false,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    columns,
    data,
  });
  return (
    <div>
      {isLoading &&
        <My_Loader />
      }
      {!isLoading &&
        <div  style={{backgroundColor:'white', paddingTop:'20px'}}>
          <div style={{padding:'30px',paddingTop:'10px', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <span style={{ color: '#424242', fontSize: '24px', fontWeight: '500' }}>
                User Management
              </span>
            </div>
            <div>
              <Button variant='outline-primary' onClick={handleExportData}>Download CSV</Button>
            </div>
          </div>
          <div style={{padding:'30px',paddingTop:'10px'}}>
            <MaterialReactTable table={table} />
          </div>
          <div>
            <UserDetail
              close_fun={close_fun}
              selectedUser={selectedUser}
              isOpen={isOpen}
            />
          </div>
        </div>
      }
    </div>
  )
}
export default User;