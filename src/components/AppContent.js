import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'




const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'))
const User = React.lazy(() => import('../views/user/User'))
const BBB = React.lazy(() => import('../views/feedback/Feedback_Main'))
const Profile = React.lazy(() => import('../pages/user_profile/User_Profile'))
const Password = React.lazy(() => import('../pages/change_pass/Change_pass'))
const Affiliation_Main = React.lazy(()=> import('../views/affiliation/Affiliation_Main'))
const Push_Notification = React.lazy(()=> import('../views/push_notification/Push_Notification'))



const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/user" element={<User/>} />
          <Route path="/affiliation" element={<Affiliation_Main/>} />
          <Route path="/bbb" element={<BBB/>} />
          <Route path="/bbb" element={<BBB/>} />
          <Route path="/push_notification" element={<Push_Notification/>} />
          <Route exact path="/my_profile"  element={<Profile />} />
          <Route path="/change_pass"  element={<Password />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
};

export default React.memo(AppContent)