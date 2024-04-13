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
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);