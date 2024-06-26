import React, { useEffect, useState } from 'react';
import {
  CRow,
  CCol,
  CWidgetStatsA,
} from '@coreui/react';

const Widgets = (props) => {

  const {user_count} = props
  
  return (
    <>
      <CRow>
        <CCol md={6} lg={3} className='py-1 fs-3 dashboard_widgets dashboard_box' >
          <div className=''>
          <CWidgetStatsA
            className="p-2"
            style={{backgroundColor:"#CBB989",fontSize:"26px",fontWeight:"600"}}
            title={user_count.male_user}
            value="Male"
          />
          </div>
        </CCol>
        <CCol sm={6} lg={3} className='py-1 fs-3 dashboard_widgets dashboard_box'>
          <CWidgetStatsA
            className="p-2"
            style={{backgroundColor:"#CBB989",fontSize:"26px",fontWeight:"600"}}
            title={user_count.female_user}
            value="Female"
          />
        </CCol>
        <CCol md={6} lg={3} className='py-1 fs-3 dashboard_widgets dashboard_box' >
          <CWidgetStatsA
            className="p-2"
            style={{backgroundColor:"#CBB989",fontSize:"26px",fontWeight:"600"}}
            title={user_count.other_user}
            value="Other"
          />
        </CCol>
        <CCol sm={6} lg={3} className='py-1 fs-3 dashboard_widgets dashboard_box'>
          <CWidgetStatsA
            className="p-2"
            style={{backgroundColor:"#CBB989",fontSize:"26px",fontWeight:"600"}}
            title={user_count.total_user}
            value="Total"
          />
        </CCol>
      </CRow>
    </>
  )
};
export default Widgets;
