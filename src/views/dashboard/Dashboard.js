import React from 'react'
import Widgets from '../widgets/Widgets'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import stylesheet from './dashboard.module.css'
import Widgets2 from '../widgets/Widgets2'

const Dashboard = () => {
  return (
    <div className={stylesheet.container}>
      <div>
        <h4 style={{ color: '#424242', fontSize: '24px', fontWeight: '500' }}>
      Statistics User
        </h4>
        </div>
        <br /> 
      <CRow>
        <CCol xs>
          <CCard style={{border:'none', backgroundColor:'#f3f3f3'}} className="mb-4">
            <CCardBody>
              <Widgets />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <br />

      <CRow>
        <CCol xs>
          <CCard style={{border:'none',backgroundColor:'#f3f3f3'}} className="mb-4">
           
            <CCardBody>
              <Widgets2 />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      </div>
    
  )
}

export default Dashboard
