import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './scss/style.scss'
import { useSelector } from 'react-redux';
import Forgot_pass from './views/login/fogot_pass/Forgot_pass';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css'

const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));
const Login = React.lazy(() => import('./views/login/Login'));
const ResetPassword = React.lazy(() => import('./views/login/fogot_pass/ResetPassword'));

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const App = () => {
  const {user,isRequested_otp} = useSelector((state) => state.userAuth);
  console.log("isRequested_otp",isRequested_otp);
  return (
    <Router>
      <Suspense fallback={loading}>
        <Routes>
          {!user &&
            <>
              <Route exact path="/login" name="Login Page" element={<Login />} />
              <Route path="*" name="Login Page" element={<Navigate to='/login' />} />
              <Route exact path='/forget_password' element={<Forgot_pass />} />
              {isRequested_otp &&
              
              <Route exact path='/reset_password' element={<ResetPassword />} />
              }
            </>
          }
          {user &&
            <>
              <Route path="*" name="Dashboard" element={<DefaultLayout />} />
            </>
          }
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App

