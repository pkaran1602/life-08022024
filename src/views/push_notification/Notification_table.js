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
        header: 'Notification Text',
        size: 150,
      },
      {
        accessorKey: 'createdAt',
        header: 'Sent On',
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
