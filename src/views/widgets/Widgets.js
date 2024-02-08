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

const Widgets = () => {

  const [selected_value, setSelected_value] = useState("total")
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
    if (event.target.value === "total") {
    }
    if (event.target.value === "date") {
      setShow(true)
      setShow1(false)
    } else if (event.target.value === "date1") {
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
        <h1 style={{ color: 'black', fontSize: '20px', fontWeight: '450', }}>User</h1>
      </div>
      <br />
      <div style={{ display: 'flex', justifyContent: 'start' }}>
        <div style={{ width: '25%' }}>
          <FormControl style={{ width: '100%' }} >
            <Select style={{ height: '5vh', fontSize: '16px', color: '#757575' }}
              value={selected_value}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem style={{ fontSize: '15px', color: '#757575' }} value="total"> Total</MenuItem>
              <MenuItem style={{ fontSize: '15px', color: '#757575' }} value="day"> Per day</MenuItem>
              <MenuItem style={{ fontSize: '15px', color: '#757575' }} value="week">Week</MenuItem>
              <MenuItem style={{ fontSize: '15px', color: '#757575' }} value="month">Month</MenuItem>
              <MenuItem style={{ fontSize: '15px', color: '#757575' }} value="quarter">Quarter</MenuItem>
              <MenuItem style={{ fontSize: '15px', color: '#757575' }} value="year">Year</MenuItem>
              <MenuItem style={{ fontSize: '15px', color: '#757575' }} value="date1">To date</MenuItem>
              <MenuItem style={{ fontSize: '15px', color: '#757575' }} value="date"> Custom date A-B</MenuItem>
            </Select>
            {show1 &&
              <div className='mt-3'>
                <div>
                  <label style={{ fontSize: '16px', color: '#757575' }} for='date'>End Date</label>
                </div>
                <div>
                  <input style={{ border: '0.1px solid #757575', color: '#757575', backgroundColor: '#ededed' }} type="date" name='date' value={selectdate.end_date} onChange={handlechange_date} />
                </div>
              </div>
            }
            {show &&
              <div className='d-flex align-center mt-3'>
                <div>
                  <label style={{ fontSize: '15px', color: '#757575' }} for='date'>Start Date</label>
                  <input style={{ border: '0.1px solid #757575', color: '#757575', backgroundColor: '#ededed' }} type="date" name='date' value={selectdate.start_date} onChange={handlechange_date} />
                </div>
                <div style={{ paddingLeft: '20px' }}>
                  <label style={{ fontSize: '15px', color: '#757575' }} for='date'>End Date</label>
                  <input style={{ border: '0.1px solid #757575', color: '#757575', backgroundColor: '#ededed' }} type="date" name='date' value={selectdate.end_date} onChange={handlechange_date} />
                </div>
              </div>
            }
          </FormControl>
        </div>
        <div style={{ marginTop: '-5px', marginLeft: '15px' }}>
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
export default Widgets;
