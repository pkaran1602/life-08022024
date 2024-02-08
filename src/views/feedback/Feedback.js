import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { get_feedback_list} from 'src/axios/Api';

const Feedback = () => {

  const [data, setData] = useState([])

  useEffect(() => {
    get_feedback_list().then((response) => {
      if(response.status ===1){
        const dataWithIndex = response.data.map((item, index) => ({
          ...item,
          index: index + 1,
        }));
        setData(dataWithIndex);
      }
    })
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'index', 
        header: 'SN',
        size: 50,
      },
      {
        accessorKey: 'name', 
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'feedback', 
        header: 'Feedback',
        size: 200,
      },
      {
        accessorKey: 'app_version',
        header: 'App Version',
        size: 150,
      },
      {
        accessorKey: 'device_name', 
        header: 'Device',
        size: 200,
      },
      {
        accessorKey: 'date', 
        header: 'Date',
        size: 200,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    // autoResetPageIndex: false,
    columns,
    data,
    enableColumnActions: false,
    enableFullScreenToggle: false,
    enableDensityToggle:false,
  });

  return <MaterialReactTable table={table} />;
};

export default Feedback;