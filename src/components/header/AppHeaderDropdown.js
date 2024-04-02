import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilLockLocked,
  cilSettings,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import style from './appHeader.module.css';
import avatar8 from './../../assets/images/8.jpg'
import { useDispatch } from 'react-redux'
import { userLogout } from 'src/redux/actions/authAction'
import Swal from 'sweetalert2'
import { NavLink } from 'react-router-dom'
import { get_admin_data } from 'src/axios/Api'

const AppHeaderDropdown = () => {

  const [user_data, setUser_data] = useState({});

  const dispach = useDispatch();

  const logoutFun = () => {
    Swal.fire({
      title: "Life Of Me",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CBB989",
      customClass: {
        confirmButton: 'custom-swal-button',
        cancelButton:'custom-swal-button'
    },
      cancelButtonColor: "#757575",
      confirmButtonText: "Logout"
    }).then((result) => {
      if (result.isConfirmed) {
        dispach(userLogout())
      }
    });
  };

  useEffect(() => {
    get_admin_data().then((response)=>{
      if(response.status === 1){
        setUser_data(response.data);
      }
    })
  }, []);
  

  return (
    <CDropdown className='my_nav' variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 profile_img" caret={false}>
        <CAvatar alt="admin-pic"   src={user_data.profile_pic} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0 " placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2"></CDropdownHeader>
        <NavLink style={{textDecoration:'none', color:'rgba(44, 56, 74, 0.95)'}} to='/my_profile'>
        <CDropdownItem >
          <CIcon icon={cilUser} className="me-2" />         
          Admin Profile   
        </CDropdownItem>
        </NavLink>
          <NavLink style={{textDecoration:'none', color:'rgba(44, 56, 74, 0.95)'}} to='/change_password'>
        <CDropdownItem>
          <CIcon icon={cilSettings} className="me-2" />
          Change Password
        </CDropdownItem>
        </NavLink>
        <CDropdownDivider />
        <CDropdownItem onClick={logoutFun} style={{ cursor: 'pointer' }}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
          <style>{`
                .custom-swal-button {
                    border: none !important;
                }
                .custom-swal-button:hover,
                .custom-swal-button:focus {
                    border: none !important;
                    box-shadow: none !important;
                }
            `}</style>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
