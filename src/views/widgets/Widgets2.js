import React, { useState } from 'react'
import {
  CRow,
  CCol,
  CWidgetStatsA,
} from '@coreui/react'

const Widgets2 = (props) => {

  const {age_group_count} = props;

  return (
    <>
    <div>
      <h1 style={{color:'#424242',fontSize:'26px',fontWeight:'450',}}>Users per age group</h1>
    </div>
    <br />
    <CRow>
      <CCol md={6} lg={3} className='py-1 fs-4'  >
        <CWidgetStatsA
          className="p-4"
          style={{backgroundColor:'rgba(201, 153, 33, 0.733)',color:'white'}}
          value={age_group_count.age_18_to_24}
          title="18-24"
        />
      </CCol>
      <CCol sm={6} lg={3} className='py-1 fs-4'>
        <CWidgetStatsA
          className="p-4"
          style={{backgroundColor:'rgba(201, 153, 33, 0.733)',color:'white'}}
          value={age_group_count.age_25_to_34}
          title="25-34"
      
        />
      </CCol>
      <CCol sm={6} lg={3} className='py-1 fs-4'>
        <CWidgetStatsA
          className="p-4"
          style={{backgroundColor:'rgba(201, 153, 33, 0.733)',color:'white'}}
          value={age_group_count.age_35_to_45}
          title="35-45"
      
        />
      </CCol>
      <CCol md={6} lg={3} className='py-1 fs-4' >
        <CWidgetStatsA
          className="p-4"
          style={{backgroundColor:'rgba(201, 153, 33, 0.733)',color:'white'}}
          value={age_group_count.age_45_plus}
          title="45+"
        />
      </CCol>
    </CRow>
    </>
  )
}

export default Widgets2;
