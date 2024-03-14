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
        <CCol md={6} lg={3} className='py-1 fs-4' >
          <CWidgetStatsA
            className="p-4"
            style={{backgroundColor:'rgba(201, 153, 33, 0.733)',color:'white'}}
            value={user_count.male_user}
            title="MALE"
          />
        </CCol>
        <CCol sm={6} lg={3} className='py-1 fs-4'>
          <CWidgetStatsA
            className="p-4"
            style={{backgroundColor:'rgba(201, 153, 33, 0.733)',color:'white'}}
            value={user_count.female_user}
            title="FEMALE"
          />
        </CCol>
        <CCol md={6} lg={3} className='py-1 fs-4' >
          <CWidgetStatsA
            className="p-4"
            style={{backgroundColor:'rgba(201, 153, 33, 0.733)',color:'white'}}
            value={user_count.other_user}
            title="OTHER"
          />
        </CCol>
        <CCol sm={6} lg={3} className='py-1 fs-4'>
          <CWidgetStatsA
            className="p-4"
            style={{backgroundColor:'rgba(201, 153, 33, 0.733)',color:'white'}}
            value={user_count.total_user}
            title="TOTAL"
          />
        </CCol>
      </CRow>
    </>
  )
};
export default Widgets;
