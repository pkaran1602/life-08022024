import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilUser,
  cilSpeedometer,
  cilBuilding,
  cilMobile,
  cil3d,
} from '@coreui/icons'
import {CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/user',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Affiliations',
    to: '/affiliation',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Feedbacks',
    to: '/feedback',
    icon: <CIcon icon={cilMobile} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Push Notifications',
    to: '/push_notification',
    icon: <CIcon icon={cil3d} customClassName="nav-icon" />,
  },
]

export default _nav
