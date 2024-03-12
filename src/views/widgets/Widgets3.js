import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Col, Row } from 'react-bootstrap';
import stylesheet from './widget3.module.css'
import { CCard, CCardBody, CCol, CRow, CWidgetStatsA } from '@coreui/react';
import Form from 'react-bootstrap/Form';


const Widgets3 = () => {

  const [selected_value, setSelected_value] = useState("week")
  const [total_user, setTotal_user] = useState(10);
  const [learner, setLearner] = useState(5);
  const [open, setOpen] = useState(5);
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [selectdate, setSelectdate] = useState({
    start_date: "",
    end_date: "",
  });

  const handleChange = (event) => {
    setSelected_value(event.target.value);
    if (event.target.value === "week") {
        setShow1(false)
    }  
   else if (event.target.value === "date1") {
      setShow1(true)
      setShow(false)
    } else {
      setShow(false)
      setShow1(false)
    }
  };

  const date = () => {
    setShow(!show)
  };

  const handlechange_date = (e) => {
    setSelectdate(e.target.value)
  };

  return (
    <>
      <div>
        <h1 style={{color:'#424242',fontSize:'26px',fontWeight:'450',}}>Wish certificates</h1>
      </div>
      <div >
      <CRow>
              <CCol xs>
                <CCard style={{ border: 'none'}} className="mb-4 ">
                  <CCardBody>
                    <div className={stylesheet.main_container}>
                          <form className='d-flex align-items-center justify-content-start' >
                    <div className={stylesheet.macsel}>
                            <Form.Select 
                              value={selected_value}
                              onChange={handleChange}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                            >                            
                              <option style={{ fontSize: '15px', color: '#757575' }} value="week">Week</option>
                              <option style={{ fontSize: '15px', color: '#757575' }} value="month">Month</option>
                              <option style={{ fontSize: '15px', color: '#757575' }} value="year">Year</option>
                              <option style={{ fontSize: '15px', color: '#757575' }} value="date1">To date</option>
                            </Form.Select>
                            </div>                      
                       <div>
                          <Button className={stylesheet.filterbtn}  variant='primary'>Filter</Button>
                       </div>                    
                          </form>
                    </div>
                    {show1 &&
                              <div className={stylesheet.my_todate}>
                                <div>
                                  <label style={{ fontSize: '16px', color: '#757575'}} for='date'>To Date</label>
                                </div>
                                <div >
                                  <input className={stylesheet.my_input} type="date" name='date' value={selectdate.end_date} onChange={handlechange_date} />
                                </div>
                              </div>
                            }
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
      </div>
      <div>

      <CRow >
        <CCol md={6} lg={3}className='py-1 fs-4'   >
          <CWidgetStatsA
            className="p-4"
            color="primary"
            value={
              <>
                {total_user}
              </>
            }
            title="MALE"
          />
        </CCol>
        <CCol sm={6} lg={3}className='py-1 fs-4'  >
          <CWidgetStatsA
            className="p-4"
            color="info"
            value={
              <>
                {learner}
              </>
            }
            title="FEMALE"
          />
        </CCol>
        <CCol sm={6} lg={3}className='py-1 fs-4'  >
          <CWidgetStatsA
            className="p-4"
            color="warning"
            value={
              <>
                {open}
              </>
            }
            title="TOTAL"
          />
        </CCol>
      </CRow>
      </div>
    </>
  )
};
export default Widgets3;
