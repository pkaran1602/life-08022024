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
      title: "Are you sure you want to logout?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout"
    }).then((result) => {
      if (result.isConfirmed) {
        dispach(userLogout())
        Swal.fire({
          icon: "success",
          title: "Logged Out!",
          showConfirmButton: false,
          timer: 800
        });
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
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={user_data.profile_pic} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Admin</CDropdownHeader>
        <NavLink style={{textDecoration:'none', color:'rgba(44, 56, 74, 0.95)'}} to='/my_profile'>
        <CDropdownItem >
          <CIcon icon={cilUser} className="me-2" />         
          Admin Profile   
        </CDropdownItem>
        </NavLink>
          <NavLink style={{textDecoration:'none', color:'rgba(44, 56, 74, 0.95)'}} to='/change_pass'>
        <CDropdownItem>
          <CIcon icon={cilSettings} className="me-2" />
          Change Password
        </CDropdownItem>
        </NavLink>
        <CDropdownDivider />
        <CDropdownItem onClick={logoutFun} style={{ cursor: 'pointer' }}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
