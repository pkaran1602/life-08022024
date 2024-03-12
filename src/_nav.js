import React from 'react'
import {CNavItem } from '@coreui/react'
import { IoSpeedometerOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { BsBuildingsFill } from "react-icons/bs";
import { MdOutlineFeedback,MdOutlineNotificationsActive } from "react-icons/md";

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
    to: '/user',
    icon: <FaUsers style={{marginRight:'7px',fontWeight:'bold',fontSize:'22px'}} />,
  },
  {
    component: CNavItem,
    name: 'Affiliations',
    to: '/affiliation',
    icon:<BsBuildingsFill style={{marginRight:'7px',fontWeight:'bold',fontSize:'22px'}} />,
  },
  {
    component: CNavItem,
    name: 'Feedbacks',
    to: '/feedback',
    icon:<MdOutlineFeedback style={{marginRight:'7px',fontWeight:'bold',fontSize:'22px'}} />,
  },
  {
    component: CNavItem,
    name: 'Push Notifications',
    to: '/push_notification',
    icon: <MdOutlineNotificationsActive style={{marginRight:'7px',fontWeight:'bold',fontSize:'22px'}}/>,
  },
]

export default _nav
