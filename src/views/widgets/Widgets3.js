import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Col, Row } from 'react-bootstrap';
import stylesheet from './widget3.module.css'
import { CCard, CCardBody, CCol, CRow, CWidgetStatsA } from '@coreui/react';
import Form from 'react-bootstrap/Form';
import { get_wishCertificateStatistics } from 'src/axios/Api';


const Widgets3 = (props) => {

  const {wish_count} = props
 

  return (
    <>
      <div>
        <h1 style={{color:'#424242',fontSize:'26px',fontWeight:'450',}}>Wish certificates created</h1>
      </div>
      <div>
      <CRow >
        <CCol sm={6} lg={3}className='py-1 fs-4'  >
          <CWidgetStatsA
            className="p-4"
            style={{backgroundColor:'rgba(201, 153, 33, 0.733)',color:'white'}}
            value={wish_count.total_count}
            title="TOTAL"
          />
        </CCol>
      </CRow>
      </div>
    </>
  )
};
export default Widgets3;
