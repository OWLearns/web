import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './Features/Login/LoginPage';
import HomePage from './Features/Home/HomePage';
import RegisterPage from './Features/Register/RegisterPage';
import VerificationPage from './Features/Verification/VerificationPage';
import ProfilePage from './Features/Profile/ProfilePage';
import CoursePage from './Features/course/CoursePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/register",
    element: <RegisterPage/>,
  },
  {
    path: "/verification",
    element: <VerificationPage/>,
  },
  {
    path: "/profile",
    element: <ProfilePage/>,
  },
  {
    path: "/course",
    element: <CoursePage/>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);