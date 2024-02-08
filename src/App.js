import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './scss/style.scss'
import { useSelector } from 'react-redux';
import Forgot_pass from './views/login/fogot_pass/Forgot_pass';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css'
import Otp_password from './views/login/fogot_pass/Otp_password';




const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));
const Login = React.lazy(() => import('./views/login/Login'));

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const App = () => {
  const {user} = useSelector((state) => state.userAuth);
  return (
    <Router>
      <Suspense fallback={loading}>
        <Routes>
          {!user &&
            <>
              <Route exact path="/login" name="Login Page" element={<Login />} />
              <Route path="*" name="Login Page" element={<Navigate to='/login' />} />
              <Route exact path='/forget_password' element={<Forgot_pass />} />
              <Route exact path='/otp_password' element={<Otp_password />} />
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

