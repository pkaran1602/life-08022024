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
            color="primary"
            value={user_count.male_user}
            title="MALE"
          />
        </CCol>
        <CCol sm={6} lg={3} className='py-1 fs-4'>
          <CWidgetStatsA
            className="p-4"
            color="info"
            value={user_count.female_user}
            title="FEMALE"
          />
        </CCol>
        <CCol sm={6} lg={3} className='py-1 fs-4'>
          <CWidgetStatsA
            className="p-4"
            color="warning"
            value={user_count.total_user}
            title="TOTAL"
          />
        </CCol>
      </CRow>
    </>
  )
};
export default Widgets;
