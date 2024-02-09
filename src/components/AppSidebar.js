import React from 'react'
import { useSelector } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import brand_logo from '../assets/brand/logo1.png';

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

import navigation from '../_nav'

const AppSidebar = () => {

  const { sidebarShow } = useSelector((state) => state.toggleReducer)

  return (
    <CSidebar
      position="fixed"
      // unfoldable={true}
      visible={sidebarShow}
      style={{ backgroundColor: '#1192CF' }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <img src={brand_logo} width='50px' />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
