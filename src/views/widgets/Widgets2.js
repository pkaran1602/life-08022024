import React, { useState } from 'react'
import {
  CRow,
  CCol,
  CWidgetStatsA,
} from '@coreui/react'

const Widgets2 = () => {

  const [total_user, setTotal_user] = useState(10);
  const [learner, setLearner] = useState(5);
  const [open, setOpen] = useState(5);


  return (
    <>
    <div>
      <h1 style={{color:'#424242',fontSize:'26px',fontWeight:'450',}}>Users per age group</h1>
    </div>
    <br />
    <CRow>
      <CCol md={6} lg={3} >
        <CWidgetStatsA
          className="p-4"
          color="primary"
          value={
            <>
             {total_user}
            </>
          }
          title="18-24"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="p-4"
          color="info"
          value={
            <>
             {learner}
            </>
          }
          title="25-34"
      
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="p-4"
          color="warning"
          value={
            <>
             {open}
            </>
          }
          title="35-45"
      
        />
      </CCol>
      <CCol md={6} lg={3} >
        <CWidgetStatsA
          className="p-4"
          color="success"
          value={
            <>
             {total_user}
            </>
          }
          title="45+"
        />
      </CCol>
    </CRow>
    </>
  )
}

export default Widgets2;
