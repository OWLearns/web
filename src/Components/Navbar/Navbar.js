import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import LogOut from '../../Hooks/LogOut';
import profileBlank from "../../Assets/profileBlank.jpg";
import CheckUserLoggedIn from "../../Hooks/CheckUser";
import supabase from "../../Middleware/Supabase";
import { useLoaderData } from "react-router-dom";
import { hexToRgb } from "@mui/material";
import { height } from "@mui/system";


export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const data = useLoaderData();
    // console.log(data);
    // const data = info.profile[0];
    // console.log(data)


    useEffect(() => {
        const checkLoggedIn = async () => {
            const loggedIn = await CheckUserLoggedIn();
            setIsLoggedIn(loggedIn);
        };
        checkLoggedIn();
    }, []);

    return (
        <>
            <div className="top-0 left-0 sticky bg-OWL-base w-full z-50">
                <div className="bg-gradient-to-b from-OWL-base to-transparent h-4 w-full absolute top-full" />
                <div className="md:px-10 py-4 px-7 md:flex justify-between items-center">
                    <div className="flex text-2xl cursor-pointer items-center gap-2">
                        {/* <span className="font-bold">OWL.</span> */}
                        <Link to={"/"} className="font-bold">OWL.</Link>
                    </div>
                    <div onClick={() => setOpen(!open)} className="w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden">
                        {open ? <IoMdClose size={24} /> : <RxHamburgerMenu size={24} />}
                    </div>
                    <ul className={`md:flex pl-9 md:pl-0 md:items-center text-xl md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto transition-all ease-in duration-100 ${open ? "top-30 z-10 bg-OWL-base " : "top-[-490px]"}`}>
                        <Link to={"/"}>
                            <li className="my-7 md:my-0 md:ml-8" onClick={() => setOpen(!open)}>
                                Home
                            </li>
                        </Link>
                        <Link to={"/learn"}>
                            <li className="my-7 md:my-0 md:ml-8" onClick={() => setOpen(!open)}>
                                Learn
                            </li>
                        </Link>
                        <Link to={"/leaderboard"}>
                            <li className="my-7 md:my-0 md:ml-8" onClick={() => setOpen(!open)}>
                                Leaderboard
                            </li>
                        </Link>
                        {isLoggedIn ? (
                            <Link to={"/profile"}>
                                <li className="my-7 md:my-0 md:ml-8">
                                    <img src={data.profile.user.avatar == null ? profileBlank : data.profile.user.avatar} className="h-8 w-8 rounded-full" />
                                </li>
                            </Link>
                        ) : (
                            <Link to={"/login"}>
                                <li className="my-7 md:my-0 md:ml-8">
                                    <button className="btn bg-orange-500 px-5 py-2 rounded-full md:static">Get Started</button>
                                </li>
                            </Link>
                        )}
                    </ul>
                </div>
            </div>
            <div className="absolute h-full w-full top-0 left-0 bg-OWL-base -z-10 overflow-hidden">
                <div className="absolute bg-OWL-light-blue rounded-full aspect-square blob -right-60" style={{top: "-500px"}}/>
                <div className="absolute bg-OWL-light-blue rounded-full aspect-square blob -left-60" style={{top: "500px"}}/>
                <div className="absolute bg-OWL-light-blue rounded-full aspect-square blob -right-60" style={{top: "1500px"}}/>
                <div className="absolute bg-OWL-light-blue rounded-full aspect-square blob -left-60" style={{top: "2500px"}}/>
                <div className="absolute bg-OWL-light-blue rounded-full aspect-square blob -right-60" style={{top: "3500px"}}/>
            </div>
            <Outlet/>
        </>
    );
}





export const NavbarData = async () => {
    try {
      const getSession = await supabase.auth.getSession();
      const access_token = getSession.data.session.access_token;
      const response = await fetch('https://nodejsdeployowl.et.r.appspot.com/profile', {
        method: 'POST',
        body: JSON.stringify({
          access_token: access_token
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      if (response.ok) {
          const data = await response.json();
         
        //   console.log(data)
    
          return data;

        //   setUserData(info);
        //   console.log(userData);
      } else {
          console.log('gagal')
          return ('null')
      }
    } catch (error) {
      console.log('error', error);
      return (null)
    }
  }