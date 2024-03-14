import React, { useEffect, useState } from 'react';
import Widgets from '../widgets/Widgets';
import { CCard, CCardBody, CCol, CRow } from '@coreui/react';
import stylesheet from './dashboard.module.css';
import Widgets2 from '../widgets/Widgets2';
import Widgets3 from '../widgets/Widgets3';
import { get_userStatistics } from 'src/axios/Api';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Col, Row } from 'react-bootstrap';
import style from '../widgets/widgets.module.css';
import My_Loader from 'src/components/loader/My_Loader';
import Form from 'react-bootstrap/Form';


const Dashboard = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [user_count, setUser_count] = useState({});
  const [wish_count, setWish_count] = useState({});
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [type, setType] = useState("total")
  const [selectdate, setSelectdate] = useState({
    start_date: "",
    end_date: "",
  });

  const get_userStatics = (data) => {
    get_userStatistics(data).then((response) => {
      console.log(response)
      setIsLoading(false);
      if (response.status === 1) {
        setUser_count(response.data.users_count);   
        setWish_count(response.data.wish_count);   

      }
    })
  };

  const handleChange = (event) => {
    if (event.target.value === "total") {
      setType("total");
    }
    if (event.target.value === "per_day") {
      setType("per_day");
    }
    if (event.target.value === "week") {
      setType("week");
    }
    if (event.target.value === "month") {
      setType("month");  
    }
    if (event.target.value === "quarter") {
      setType("quarter");
    }
    if (event.target.value === "year") {
      setType("year");
    }
    if (event.target.value === "custom_date") {
      setType("custom_date");
      setShow(true)
      setShow1(false)
    } else if (event.target.value === "to_date") {
      setType("to_date")
      setShow1(true)
      setShow(false)
    } else {
      setShow(false)
      setShow1(false)
    }
  };

  const filter_btn = ()=>{
    let data = { type: type, start_date: selectdate.start_date, end_date: selectdate.end_date };
    get_userStatics(data);
    console.log(data)
  }

  const date = () => {
    setShow(!show)
  };

  const handlechange_date = (e) => {
    setSelectdate({...selectdate , [e.target.name]:e.target.value})
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
          <div className={stylesheet.heading}>
            <h4 style={{ color: '#424242', fontSize: '26px', fontWeight: '500',padding:"15px 0"}}>
              Statistics List
            </h4>
          </div>
          <div >
            <CRow>
              <CCol xs>
                <CCard style={{ border: 'none', backgroundColor: 'white', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}} className="mb-4 ">
                  <CCardBody>
                    <div>
                      <h1 style={{ color: '#424242', fontSize: '24px', fontWeight: '450', }}>Users</h1>
                    </div>
                    <div className='my-4'>
                          <form className='d-flex align-items-center justify-content-start'>
                            <div className={stylesheet.macsel}>
                            <Form.Select size="md" 
                              value={type}
                              onChange={handleChange}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                            >
                              <option style={{ fontSize: '15px', color: '#757575' }} value="total"> All</option>
                              <option style={{ fontSize: '15px', color: '#757575' }} value="per_day">Today</option>
                              <option style={{ fontSize: '15px', color: '#757575' }} value="week">Weekly</option>
                              <option style={{ fontSize: '15px', color: '#757575' }} value="month">Monthly</option>
                              <option style={{ fontSize: '15px', color: '#757575' }} value="quarter">Quarterly</option>
                              <option style={{ fontSize: '15px', color: '#757575' }} value="year">Yearly</option>
                              <option style={{ fontSize: '15px', color: '#757575' }} value="custom_date"> Custom date A-B</option>
                              <option style={{ fontSize: '15px', color: '#757575' }} value="to_date">To date</option>
                            </Form.Select>
                            </div>    
                            <div>
                          <Button className={stylesheet.filterbtn} onClick={filter_btn}  variant='primary'>Filter</Button>              
                              </div>               
                          </form>
                    </div>
                    {show1 &&
                              <div className='mb-2'>
                                <div>
                                  <label style={{ fontSize: '16px', color: '#757575' }} for='start_date'>To Date</label>
                                </div>
                                <div >
                                  <input className={stylesheet.my_input} type="date" name='start_date' value={selectdate.start_date} onChange={handlechange_date} />
                                </div>
                              </div>
                            }
                    {show &&
                      <div style={{ width: '100%' }}>
                        <Row >
                          <Col md={3}>
                            <div>
                              <div>
                                <label style={{ fontSize: '16px', color: '#757575' }} for='date'>Start Date</label>
                              </div>
                              <div>
                                <input className={stylesheet.my_input} type="date" name='start_date' value={selectdate.start_date} onChange={handlechange_date} />
                              </div>
                            </div>
                          </Col>
                          <Col md={4}>
                            <div>
                              <label style={{ fontSize: '16px', color: '#757575' }} for='date'>End Date</label>
                              <div>
                              <input className={stylesheet.my_input} style={{marginRight:'20px !important'}} type="date" name='end_date' value={selectdate.end_date} onChange={handlechange_date} />
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
                <CCard style={{border: 'none', backgroundColor: 'white', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className="mb-4 ">
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
              <CCard style={{ border: 'none', backgroundColor: 'white', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className="mb-4 ">
                <CCardBody>
                  <Widgets3 
                  wish_count={wish_count}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </div>
      }
    </div>
  )
};

export default Dashboard;
