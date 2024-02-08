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
        header: 'SN ',
        size: 50,
      },
      {
        accessorKey: 'message',
        header: 'Notification',
        size: 150,
      },
      {
        accessorKey: 'createdAt',
        header: 'Title',
        size: 200,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    enableColumnActions: false,
    enableFullScreenToggle: false,
    enableDensityToggle:false,
    columns,
    data, 
  });

  return <MaterialReactTable table={table} />;
};

export default Notification_table;
