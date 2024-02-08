
import React from 'react'
import Example from './UserData_Table'
import { useEffect, useMemo, useState } from 'react';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { get_users_list } from 'src/axios/Api';
import { useMaterialReactTable } from 'material-react-table';
import UserDetail from './UserDetail';
import { FaEye } from "react-icons/fa";
import { Button } from 'react-bootstrap';
import style from './user.module.css'

const User = () => {

  const [data, setData] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  useEffect(() => {
    get_users_list().then((response) => {
      const dataWithIndex = response.data.map((item, index) => ({
        ...item,
        index: index + 1,
      }));
      setData(dataWithIndex);
    })
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
      },
    ],
  );

  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
  });
  const table = useMaterialReactTable({
    // enableRowActions: false,
    enableColumnActions: false,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    columns,
    data,
    // muiTableContainerProps: {
    //   //conditionally style pinned columns
    //   sx: {
    //     backgroundColor: "red"
    //   }
    // }
  });
  return (
    <div>
      <div style={{ paddingBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <span style={{ color: '#424242',fontSize:'24px',  fontWeight: '500' }}>
            Users
          </span>
        </div>
        <div>
          <Button variant='outline-primary' onClick={handleExportData}>Download</Button>
        </div>
      </div>
      <div>
        <Example 
          table={table}
        />
      </div>
      <div>
        <UserDetail
          close_fun={close_fun}
          selectedUser={selectedUser}
          isOpen={isOpen}
        />
      </div>
    </div>
  )
}
export default User;