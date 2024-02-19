import React, { useState } from 'react';
import {
  CRow,
  CCol,
  CWidgetStatsA,
} from '@coreui/react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from 'react-bootstrap';
import style from './widgets.module.css'

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
      <br />
      <div style={{ display: 'flex', justifyContent: 'start' }}>
        <div style={{ width: '25%' }}>
          <FormControl style={{ width: '100%' }} >
            <Select className={style.main_select_menu}
              value={selected_value}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem style={{ fontSize: '15px', color: '#757575' }} value="week">Week</MenuItem>
              <MenuItem style={{ fontSize: '15px', color: '#757575' }} value="month">Month</MenuItem>
              <MenuItem style={{ fontSize: '15px', color: '#757575' }} value="year">Year</MenuItem>
              <MenuItem style={{ fontSize: '15px', color: '#757575' }} value="date1">To date</MenuItem>
            </Select>
            {show1 &&
              <div className='mt-3'>
                <div>
                  <label style={{ fontSize: '16px', color: '#757575' }} for='date'>To Date</label>
                </div>
                <div className={style.my_input}>
                  <input  type="date" name='date' value={selectdate.end_date} onChange={handlechange_date} />
                </div>
              </div>
            }
          </FormControl>
        </div>
        <div className={style.my_btn}>
          <Button variant='primary'>Filter</Button>
        </div>
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
            title="MALE"
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
            title="FEMALE"
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
            title="TOTAL"
          />
        </CCol>
      </CRow>
    </>
  )
};
export default Widgets3;
