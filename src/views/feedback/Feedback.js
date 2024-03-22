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
import { Button } from 'react-bootstrap';



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
        header: 'ID',
        size: 25,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 100,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 100,
      },
      {
        accessorKey: 'feedback',
        header: 'Message',
        size: 280,
        enableSorting: false,

      },
      {
        accessorKey: 'date',
        header: 'Submitted On',
        size: 50,
      },
      {
        accessorFn: (row) =>
          <>
            <Button
              style={{ color: "black"}}
              onClick={() => view_fun(row)}
            >View</Button>
          </>,
        id: 'Button',
        header: 'Action',
        Header: () => <span>Actions</span>,
        enableSorting: false,
        enableColumnFilter :false,
        size: 50,
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







