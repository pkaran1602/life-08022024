import React from 'react'
import {CNavItem } from '@coreui/react'
import { IoSpeedometerOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { BsBuildingsFill } from "react-icons/bs";
import { MdOutlineFeedback,MdOutlineNotificationsActive } from "react-icons/md";
import { PiUsersThreeLight } from "react-icons/pi"
import { BsBuildings } from "react-icons/bs";

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <IoSpeedometerOutline style={{marginRight:'7px',fontWeight:'bold',fontSize:'22px'}} />,
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <PiUsersThreeLight style={{marginRight:'7px',fontWeight:'bold',fontSize:'22px'}} />,
  },
  {
    component: CNavItem,
    name: 'Affiliations',
    to: '/affiliations',
    icon:<BsBuildings style={{marginRight:'7px',fontWeight:'bold',fontSize:'22px'}} />,
  },
  {
    component: CNavItem,
    name: 'Feedbacks',
    to: '/feedbacks',
    icon:<MdOutlineFeedback style={{marginRight:'7px',fontWeight:'bold',fontSize:'22px'}} />,
  },
  {
    component: CNavItem,
    name: 'Push Notifications',
    to: '/push_notifications',
    icon: <MdOutlineNotificationsActive style={{marginRight:'7px',fontWeight:'bold',fontSize:'22px'}}/>,
  },
]

export default _nav
