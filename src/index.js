
import React, { useState } from 'react';
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
import ProfilePage from './Features/Profile/ProfilePage';
import CoursesPage from './Features/Course/CoursesPage';
import LearnPage from './Features/LearnPage/LearnPage.js';
import Navbar, {NavbarData }  from './Components/Navbar/Navbar';
import EditProfile, {fetchProfileData } from './Features/EditProfile/EditProfile.js';
import TopicPage from './Features/Topic/TopicPage.js';
import MaterialsPage from './Features/Materials/MaterialsPage.js';
import QuizPage from './Features/QuizPage/QuizPage.js';
import Leaderboard from './Features/Leaderboards/Leaderboards.js';
import App from './app.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App/>
);