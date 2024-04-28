import CheckUserLoggedIn from "../../Hooks/CheckUser";
import { useEffect, useState } from "react";
import Navbar from '../../Components/Navbar/Navbar.js';
import Potrait from "../../Assets/potrait.png";
import Web from "../../Assets/web.png";
import Footer from "../../Components/Footer/Footer.js";
import supabase from "../../Middleware/Supabase";

export default function ProfilePage() {

    const [isLoading, setLoading] = useState(true);
    const [userData, setUserData] = useState({});
    useEffect(() => {
        fetchProfileData();
        

    }, []);
    
    const fetchProfileData = async () => {
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
            console.log(data);
           setUserData(data);
        } else {
            console.log('gagal')
        }
      } catch (error) {
        console.log('error', error);
        
      }

    }

    useEffect(() => {
        const check = async () => {
            const isLoggedIn = await CheckUserLoggedIn();
            if (isLoggedIn) {
                setLoading(false);
            } else {
                window.location.href = '/login';
            }
        }
        check();
    }, []); 

    if (isLoading) {
        return <>Loading</>;
    } else {
        return (
            <>
                <Navbar/>
                <div className="bg-OWL-base p-6 lg:px-24 xl:px-44">
                    <div className="mt-20 p-32 py-20 relative">
                        <div className="absolute bg-gradient-to-br from-OWL-dark-blue to-OWL-mid-blue w-full top-0 left-0 h-52 rounded-3xl"/>
                        <div className="z-10 relative flex justify-between">
                            <div className="">
                                    <img src={userData.avatar} className="rounded-full h-52 border-4 border-OWL-base" />
                                <div className="mt-4">
                                    <h1 className="text-2xl font-semibold">{userData.username}</h1>
                                    <p className="mt-2">No 1 Award Achiever</p>
                                    <p className="mt-1">Jakarta, Indonesia</p>
                                </div>
                            </div>
                            <div className="self-end flex flex-col items-end">
                                <div className="flex gap-10">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">57</p>
                                        <p>Followers</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">26</p>
                                        <p>Following</p>
                                    </div>
                                </div>
                                <button className="mt-4 border-2 border-OWL-light-blue text-OWL-light-blue p-2 px-4 rounded-lg">Edit Profile</button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 p-20 py-14 border-2 border-gray-400 rounded-3xl">
                        <h1 className="text-2xl font-bold">Achievement</h1>
                        <div className="flex justify-between mt-10">
                            <div className="rounded-3xl border-2 border-gray-300 p-2 flex gap-6 items-center">
                                <img src={Potrait} className="rounded-2xl h-10" />
                                <p className="text-xl">Future Developer</p>
                            </div>
                            <div className="rounded-3xl border-2 border-gray-300 p-2 flex gap-6 items-center">
                                <img src={Potrait} className="rounded-2xl h-10" />
                                <p className="text-xl">Future Developer</p>
                            </div>
                            <div className="rounded-3xl border-2 border-gray-300 p-2 flex gap-6 items-center">
                                <img src={Potrait} className="rounded-2xl h-10" />
                                <p className="text-xl">Future Developer</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-28 p-20 py-14 border-2 border-gray-400 rounded-3xl">
                        <h1 className="text-2xl font-bold">Statistic</h1>
                        <div className="flex mt-10">
                            <div className="flex flex-col gap-2 w-1/2">
                                <p className="">Course Completed : <span className="font-bold">2</span></p>
                                <p className="">Topic Completed : <span className="font-bold">14</span></p>
                                <p className="">Material Completed : <span className="font-bold">169</span></p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="">Daily Steak : <span className="font-bold">5</span></p>
                                <p className="">Quiz Completed : <span className="font-bold">198</span></p>
                                <p className="">Mission Completed : <span className="font-bold">9</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-28 p-20 py-14 border-2 border-gray-400 rounded-3xl mb-5">
                        <h1 className="text-2xl font-bold">Course Completed</h1>
                        <div className="flex mt-10 gap-5">
                            <div className="flex flex-col items-center">
                                <img src={Web} alt="a" className="w-52" />
                                <p className="font-semibold text-sm lg:text-lg">Web Development</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <img src={Web} alt="a" className="w-52" />
                                <p className="font-semibold text-sm lg:text-lg">Web Development</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}
