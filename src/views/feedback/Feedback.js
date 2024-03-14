import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { get_feedback_list } from 'src/axios/Api';
import { token_expire } from 'src/redux/actions/authAction';
import { useDispatch } from 'react-redux';
import My_Loader from 'src/components/loader/My_Loader';
import { FaEye } from "react-icons/fa";
import Feedback_details from './Feedback_details';


const Feedback = () => {

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([])
  const [selectedUser, setSelectedUser] = useState({});

  const view_fun = (user_detail) => {
    setIsOpen(true);
    setSelectedUser(user_detail);
  };
  const close_fun = () => {
    setIsOpen(false);
    setSelectedUser({});
  };

  useEffect(() => {
    get_feedback_list().then((response) => {
      console.log(response)
      setIsLoading(false);
      if (response.status === 1) {
        const dataWithIndex = response.data.map((item, index) => ({
          ...item,
          index: index + 1,
          name: item.name || "N/A",
          email: item.email || "N/A",
          feedback: item.feedback || "N/A",
          date: item.date || "N/A",
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
        accessorKey: 'email',
        header: 'Email',
        size: 50,
      },
      {
        accessorKey: 'feedback',
        header: 'Feedback',
        size: 300,
      },
      {
        accessorKey: 'date',
        header: 'Submitted On',
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
        enableSorting: false,
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
              Feedbacks
              </span>
            </div>
            <div style={{ marginTop: '20px' }}>
              <MaterialReactTable table={table} />
            </div>
            <div>
              <Feedback_details 
               close_fun={close_fun}
               selectedUser={selectedUser}
               isOpen={isOpen}
              />
            </div>
          </div>
        }
      </div>
    </>
  )
};

export default Feedback;







