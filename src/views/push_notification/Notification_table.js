import React from 'react';
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';



const Notification_table = (props) => {

    const {data} = props

    

  const columns = useMemo(
    () => [
      {
        accessorKey: 'index',
        header: 'ID ',
        size: 5,
      },
      {
        accessorKey: 'message',
        header: 'Message',
        size: 250, 
        enableSorting: false,

      },
      
      {
        accessorKey: 'createdAt',
        header: 'Sent On',
        size: 50,
      },
    ],
    [],
  );

  

  const table = useMaterialReactTable({
    columns,
    data, 
    enableColumnActions: false,
    enableFullScreenToggle: false,
    enableDensityToggle:false,
    muiTablePaperProps: {
      sx: {
        borderRadius: '8px',
         boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default Notification_table;
