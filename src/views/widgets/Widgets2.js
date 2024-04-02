import React, { useState } from 'react'
import {
  CRow,
  CCol,
  CWidgetStatsA,
} from '@coreui/react'

const Widgets2 = (props) => {

  const { age_group_count } = props;

  return (
    <>
      <div>
        <h1 style={{ color: '#424242', fontSize: '22px', fontWeight: '450', }}>Users Age Per Group</h1>
      </div>
      <CRow className="d-flex align-items-center">
        
        <CCol md={6} lg={3} className='py-1 fs-3 dashboard_widgets dashboard_box'>
          <CWidgetStatsA
            className="p-2"
            style={{ backgroundColor: "#CBB989",fontSize:"26px",fontWeight:"600" }}
            title={age_group_count.age_18_to_24}
            value="18-24"
          />
        </CCol>
        <CCol sm={6} lg={3} className='py-1 fs-3 dashboard_widgets dashboard_box'>
          <CWidgetStatsA
            className="p-2"
            style={{ backgroundColor: "#CBB989",fontSize:"26px",fontWeight:"600" }}
            title={age_group_count.age_25_to_34}
            value="25-34"
            
          />
        </CCol>
        <CCol sm={6} lg={3} className='py-1 fs-3 dashboard_widgets dashboard_box'>
          <CWidgetStatsA
            className="p-2"
            style={{ backgroundColor: "#CBB989",fontSize:"26px",fontWeight:"600" }}
            title={age_group_count.age_35_to_45}
            value="35-45"

          />
        </CCol>
        <CCol md={6} lg={3} className='py-1 fs-3 dashboard_widgets dashboard_box' >
          <CWidgetStatsA
            className="p-2"
            style={{ backgroundColor: "#CBB989",fontSize:"26px",fontWeight:"600" }}
            title={age_group_count.age_45_plus}
            value="45+"
          />
        </CCol>
      </CRow>
    </>
  )
}

export default Widgets2;
