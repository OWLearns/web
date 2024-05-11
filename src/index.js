


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './Features/Login/LoginPage';
import HomePage from './Features/Home/HomePage';
import RegisterPage from './Features/Register/RegisterPage';
import VerificationPage from './Features/Verification/VerificationPage';
import ProfilePage, {fetchProfileData } from './Features/Profile/ProfilePage';
import CoursesPage from './Features/Course/CoursesPage';
import LearnPage from './Features/LearnPage/LearnPage.js';
import Navbar, {NavbarData }  from './Components/Navbar/Navbar';
import EditProfile from './Features/EditProfile/EditProfile.js';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/verification' element={<VerificationPage/>}/>
      <Route path="/" element={<Navbar/> } loader={NavbarData} >
        <Route index element={<HomePage/>}/>
        <Route path='/profile' element={<ProfilePage/>} loader={fetchProfileData} />
         <Route path=':editprofile' element={<EditProfile/>} loader={fetchProfileData} />
        <Route/>
        <Route path='/learn'>
          <Route index element={<LearnPage/>}/>
          <Route path=':course' element={<CoursesPage/>}/>
        </Route>
      </Route>
    </Route>
  )
);
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomePage/>
//   },
//   {
//     path: "/login",
//     element: <LoginPage/>,
//   },
//   {
//     path: "/register",
//     element: <RegisterPage/>,
//   },
//   {
//     path: "/verification",
//     element: <VerificationPage/>,
//   },
//   {
//     path: "/profile",
//     element: <ProfilePage/>,
//   },
//   {
//     path: "/courses",
//     element: <CoursesPage/>,
//   },
// ]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  
);