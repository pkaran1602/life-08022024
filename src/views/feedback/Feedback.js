import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { get_feedback_list } from 'src/axios/Api';
import { token_expire } from 'src/redux/actions/authAction';
import { useDispatch } from 'react-redux';
import My_Loader from 'src/components/loader/My_Loader';

const Feedback = () => {

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])

  useEffect(() => {
    get_feedback_list().then((response) => {
      setIsLoading(false);
      if (response.status === 1) {
        const dataWithIndex = response.data.map((item, index) => ({
          ...item,
          index: index + 1,
        }));
        setData(dataWithIndex);
      } else if (response.status === 4) {
        dispatch(token_expire());
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
        size: 300,
      },
      {
        accessorKey: 'app_version',
        header: 'App Version',
        size: 50,
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
    enableDensityToggle: false,
  });

  return (
    <>
      <div>
        {isLoading &&
          <My_Loader />
        }
        {!isLoading &&
          < div style={{backgroundColor:'white', padding:'30px',paddingTop:'20px'}}>
            <div >
              <span style={{ color: '#424242', fontSize: '24px', fontWeight: '500' }}>
              Feedbacks Management
              </span>
            </div>
            <div style={{ marginTop: '20px' }}>
              <MaterialReactTable table={table} />
            </div>
          </div>
        }
      </div>
    </>
  )
};

export default Feedback;