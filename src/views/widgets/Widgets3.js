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
        <h1 style={{color:'#424242',fontSize:'22px',fontWeight:'450',}}>Total Wish Certificates Generated</h1>
      </div>
      <div>
      <CRow >
        <CCol sm={6} lg={3}className='py-1 fs-3 dashboard_widgets'  >
          <CWidgetStatsA
            className="p-2 d-flex card-text-center justify-content-center text-center"
            style={{backgroundColor:"#CBB989"}}
            title={wish_count.total_count}
            value="Certificates"
          />
        </CCol>
      </CRow>
      </div>
    </>
  )
};
export default Widgets3;
