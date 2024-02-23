import React, { useEffect, useState } from 'react'
import Widgets from '../widgets/Widgets'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import stylesheet from './dashboard.module.css'
import Widgets2 from '../widgets/Widgets2'
import Widgets3 from '../widgets/Widgets3'
import { get_userStatistics } from 'src/axios/Api'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Col, Row } from 'react-bootstrap';
import style from '../widgets/widgets.module.css'
import My_Loader from 'src/components/loader/My_Loader'


const Dashboard = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [selected_value, setSelected_value] = useState("total")
  const [user_count, setUser_count] = useState({
    total_user: 0,
    male_user: 0,
    female_user: 0,
    age_18_to_24: 0,
    age_25_to_34: 0,
    age_35_to_45: 0,
    age_45_plus: 0
  });
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [selectdate, setSelectdate] = useState({
    start_date: "",
    end_date: "",
  });

  const get_userStatics = (data) => {
    get_userStatistics(data).then((response) => {
      setIsLoading(false);
      if (response.status === 1) {
        setUser_count(response.data);
       
      }
    })
  }

  const handleChange = (event) => {
    setSelected_value(event.target.value);
    console.log(event.target.value)
    if (event.target.value === "total") {
      let data = { type: "total", start_date: selectdate.start_date, end_date: selectdate.end_date };
      get_userStatics(data)
    }
    if (event.target.value === "per_day") {
      let data = { type: "per_day", start_date: selectdate.start_date, end_date: selectdate.end_date };
      // get_userStatics(data);  
    }
    if (event.target.value === "week") {
      let data = { type: "week", start_date: selectdate.start_date, end_date: selectdate.end_date };
      get_userStatics(data);
    }
    if (event.target.value === "month") {
      let data = { type: "month", start_date: selectdate.start_date, end_date: selectdate.end_date };
      get_userStatics(data);   
    }
    if (event.target.value === "quarter") {
      let data = { type: "quarter", start_date: selectdate.start_date, end_date: selectdate.end_date };
      get_userStatics(data);
    }
    if (event.target.value === "year") {
      let data = { type: "year", start_date: selectdate.start_date, end_date: selectdate.end_date };
      get_userStatics(data);
    }
    if (event.target.value === "date") {
      let data = { type: "date", start_date: selectdate.start_date, end_date: selectdate.end_date };
      // get_userStatics(data);
      setShow(true)
      setShow1(false)
    } else if (event.target.value === "date1") {
      let data = { type: "date1", start_date: selectdate.start_date, end_date: selectdate.end_date };
      // get_userStatics(data);
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

  useEffect(() => {
    let data = { type: "total", start_date: selectdate.start_date, end_date: selectdate.end_date };
    get_userStatics(data);
  }, [])


  return (
    <div>
      {isLoading &&
        <My_Loader />
      }
      {!isLoading &&
        <div className={stylesheet.container}>

          <div>
            <h4 style={{ color: '#424242', fontSize: '24px', fontWeight: '500' }}>
              Statistics List
            </h4>
          </div>
          <div style={{ backgroundColor: '#f3f3f3' }}>
            <CRow>
              <CCol xs>
                <CCard style={{ border: 'none', backgroundColor: '#f3f3f3' }} className="mb-4 ">
                  <CCardBody>
                    <div>
                      <h1 style={{ color: '#424242', fontSize: '26px', fontWeight: '450', }}>Users</h1>
                    </div>
                    <div className='my-4'>
                          <FormControl  >
                      <Row >
                        <Col md={8}>
                            <Select className={stylesheet.macsel}
                              style={{width:"250px",height:'5vh'}}
                              value={selected_value}
                              onChange={handleChange}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                            >
                              <MenuItem style={{ fontSize: '15px', color: '#757575' }} value="total"> Total</MenuItem>
                              <MenuItem style={{ fontSize: '15px', color: '#757575' }} value="per_day"> Per day</MenuItem>
                              <MenuItem style={{ fontSize: '15px', color: '#757575' }} value="week">Week</MenuItem>
                              <MenuItem style={{ fontSize: '15px', color: '#757575' }} value="month">Month</MenuItem>
                              <MenuItem style={{ fontSize: '15px', color: '#757575' }} value="quarter">Quarter</MenuItem>
                              <MenuItem style={{ fontSize: '15px', color: '#757575' }} value="year">Year</MenuItem>
                              <MenuItem style={{ fontSize: '15px', color: '#757575' }} value="date1">To date</MenuItem>
                              <MenuItem style={{ fontSize: '15px', color: '#757575' }} value="date"> Custom date A-B</MenuItem>
                            </Select>
                            
                        </Col>
                        <Col md={4} >
                          <Button className={stylesheet.filterbtn}  variant='primary'>Filter</Button>
                        </Col>
                      </Row>
                          </FormControl>

                    </div>
                    {show1 &&
                              <div className='mb-2'>
                                <div>
                                  <label style={{ fontSize: '16px', color: '#757575' }} for='date'>To Date</label>
                                </div>
                                <div className={style.my_input}>
                                  <input type="date" name='date' value={selectdate.end_date} onChange={handlechange_date} />
                                </div>
                              </div>
                            }
                    {show &&
                      <div style={{ width: '100%' }}>
                        <Row >
                          <Col md={4}>
                            <div>
                              <div>
                                <label for='date'>Start Date</label>
                              </div>
                              <div>
                                <input className={stylesheet.my_input} type="date" name='date' value={selectdate.start_date} onChange={handlechange_date} />
                              </div>
                            </div>
                          </Col>
                          <Col md={4}>
                            <div>
                              <label for='date'>End Date</label>
                              <div>
                              <input className={stylesheet.my_input} type="date" name='date' value={selectdate.end_date} onChange={handlechange_date} />
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    }
                    <Widgets
                      user_count={user_count}
                    />
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs>
                <CCard style={{ border: 'none', backgroundColor: '#f3f3f3' }} className="mb-4 ">
                  <CCardBody>
                    <Widgets2
                      age_group_count={user_count} />
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </div>
          <br />
          <CRow>
            <CCol xs>
              <CCard style={{ border: 'none', backgroundColor: '#f3f3f3' }} className="mb-4 ">
                <CCardBody>
                  <Widgets3 />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </div>
      }
    </div>
  )
}

export default Dashboard;
