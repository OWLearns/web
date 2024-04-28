import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import LogOut from '../../Hooks/LogOut';
import potrait from "../../Assets/potrait.png";
import CheckUserLoggedIn from "../../Hooks/CheckUser";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoggedIn = async () => {
            const loggedIn = await CheckUserLoggedIn();
            setIsLoggedIn(loggedIn);
        };
        checkLoggedIn();
    }, []);

    return (
        <div className="top-0 left-0 sticky bg-OWL-base w-full mt-2 z-50">
            <div className="bg-gradient-to-b from-OWL-base to-transparent h-4 w-full absolute top-full" />
            <div className="md:px-10 py-4 px-7 md:flex justify-between items-center">
                <div className="flex text-2xl cursor-pointer items-center gap-2">
                    <span className="font-bold">OWL.</span>
                </div>
                <div onClick={() => setOpen(!open)} className="w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden">
                    {open ? <IoMdClose size={24} /> : <RxHamburgerMenu size={24} />}
                </div>
                <ul className={`md:flex pl-9 md:pl-0 md:items-center text-xl md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto transition-all ease-in duration-100 ${open ? "top-30 z-10 bg-OWL-base " : "top-[-490px]"}`}>
                    <Link to={"/"}>
                        <li className="my-7 md:my-0 md:ml-8">
                            Home
                        </li>
                    </Link>
                    <Link to={"/Courses"}>
                        <li className="my-7 md:my-0 md:ml-8">
                            Learning
                        </li>
                    </Link>
                    <Link to={"/leaderboard"}>
                        <li className="my-7 md:my-0 md:ml-8">
                            Leaderboard
                        </li>
                    </Link>
                    <li className="my-7 md:my-0 md:ml-8">
                        <button onClick={LogOut}>Log out</button>
                    </li>
                    {isLoggedIn ? (
                        <Link to={"/profile"}>
                            <li className="my-7 md:my-0 md:ml-8">
                                <img src={potrait} className="h-8 w-8 rounded-full" />
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
    );
}
