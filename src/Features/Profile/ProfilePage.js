import loading from "../../Assets/loading.svg"
import CheckUserLoggedIn from "../../Hooks/CheckUser";
import { useEffect, useState } from "react";
import Navbar from '../../Components/Navbar/Navbar.js';
import profileBlank from "../../Assets/profileBlank.jpg";
import CoursePict from "../../Assets/coursepict.png";
import Web from "../../Assets/web.png";
import Footer from "../../Components/Footer/Footer.js";
import supabase from "../../Middleware/Supabase";
import { useLoaderData, Link } from "react-router-dom";
import { RiShieldFill } from "react-icons/ri";
import LogOut from "../../Hooks/LogOut.js";

export default function ProfilePage() {

    const [isLoading, setLoading] = useState(true);
    const [profile, setProfile] = useState();
    const [achievement, setAchiement] = useState(false);
    const [completedCourse, setCompletedCourse] = useState(false);
    // const [userData, setUserData] = useState({})
    const [data, setData] = useState();
    // const data = info.profile[0];
    // console.log(profile);

    // useEffect(() => {
    //     fetchProfileData();
    // }, []);
    

    useEffect(() => {
        // 
        const check = async () => {
            const isLoggedIn = await CheckUserLoggedIn();
            if (isLoggedIn) {
            } else {
                window.location.href = '/login';
            }
        }
        check();

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
              const a = await response.json()
              setProfile(a.profile)
              console.log(a)
            //   return data;
            //   return data;
            setLoading(false);
    
            //   setUserData(info);
            //   console.log(userData);
          } else {
              console.log('gagal')
          }
        } catch (error) {
          console.log('error', error);
          
        }
    
      }


    if (isLoading) {
        return (
            <>
                <div className="absolute top-0 left-0 z-0 w-full h-screen grid place-items-center  bg-OWL-base">
                    <img src={loading} className="w-44 lg:w-72 aspect-square"/>
                </div>
            </>
            )
    } else {
        return (
            <>
                {/* <Navbar/> */}
                <div className="bg-OWL-base p-6 lg:px-24 xl:px-44">
                    <div className="lg:mt-20 xl:p-32 py-16 lg:py-20 relative">
                        <div className="absolute bg-gradient-to-br from-OWL-dark-blue to-OWL-mid-blue w-full top-0 left-0 h-28 lg:h-56 xl:h-72 rounded-3xl  "/>
                        <div className="z-10 relative flex justify-around xl:justify-between gap-4 pt-2">
                            <div className=" flex flex-col justify-center items-center">
                                <img src={profile.user.avatar == null ? profileBlank : profile.user.avatar} className="rounded-full w-20 lg:w-52 border-4 border-OWL-base aspect-square" />
                                <div className="flex flex-col justify-center items-center">
                                    <h1 className="text-2xl font-semibold flex items-center gap-2">{profile.user.username} <span className="relative grid place-items-center"><RiShieldFill size={40}/><p className="absolute text-white text-lg">{Math.floor(profile.user.exp/100)+1}</p></span></h1>
                                    <p className="">{profile.user.biodata}</p>
                                </div>
                            </div>
                            <div className="self-end flex flex-col items-end">
                                {/* <div className="flex gap-10">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">57</p>
                                        <p>Followers</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">26</p>
                                        <p>Following</p>
                                    </div>
                                </div> */}

                                <Link to="/editprofile">
                                    <button className="mt-4 border-2 border-OWL-light-blue text-OWL-light-blue p-2 px-4 rounded-lg">Edit Profile</button>
                                </Link>
                                <button onClick={LogOut} className="mt-2 border-2 border-orange-500 text-orange-500 p-2 px-4 rounded-lg">Log out</button>
                            </div>
                        </div>
                    </div>
                    <div className=" p-8 lg:p-20 lg:py-14 border-2 border-gray-400 rounded-3xl">
                        <h1 className="text-2xl font-bold">Achievement</h1>
                        <div className="flex justify-between mt-10">
                            {
                                profile.achievement.map((e)=>{
                                    setAchiement(true)
                                    return(
                                        <div className="rounded-3xl border-2 border-gray-300 p-2 flex gap-6 items-center">
                                            <img src={CoursePict} className="rounded-2xl h-10" />
                                            <p className="text-xl">{e.name}</p>
                                        </div>
                                    )
                                })
                            }
                            {!achievement &&
                                <div>No achievement yet</div>
                            }
                            {/* <div className="rounded-3xl border-2 border-gray-300 p-2 flex gap-6 items-center">
                                <img src={CoursePict} className="rounded-2xl h-10" />
                                <p className="text-xl">Future Developer</p>
                            </div>
                            <div className="rounded-3xl border-2 border-gray-300 p-2 flex gap-6 items-center">
                                <img src={CoursePict} className="rounded-2xl h-10" />
                                <p className="text-xl">Future Developer</p>
                            </div>
                            <div className="rounded-3xl border-2 border-gray-300 p-2 flex gap-6 items-center">
                                <img src={CoursePict} className="rounded-2xl h-10" />
                                <p className="text-xl">Future Developer</p>
                            </div> */}
                        </div>
                    </div>
                    <div className="mt-8 lg:mt-16 p-8 lg:p-20 py-8   lg:py-14 border-2 border-gray-400 rounded-3xl">
                        <h1 className="text-2xl font-bold">Statistic</h1>
                        <div className="flex mt-6 flex-col lg:flex-row">
                            <div className="flex flex-col gap-2 w-1/2">
                                <table className="w-min">
                                    <tr>
                                        <td><p className="text-nowrap">Course Completed </p></td>
                                        <td className="px-3"> : </td>
                                        <td> <span className="font-bold">{profile.user.course_completed}</span></td>
                                    </tr>
                                    <tr>
                                        <td><p className="text-nowrap">Topic Completed </p></td>
                                        <td className="px-3"> : </td>
                                        <td> <span className="font-bold">{profile.user.topic_completed}</span></td>
                                    </tr>
                                    <tr>
                                        <td><p className="text-nowrap">Material Completed </p></td>
                                        <td className="px-3"> : </td>
                                        <td> <span className="font-bold">{profile.user.materials_completed}</span></td>
                                    </tr>
                                </table>
                                {/* <p className="">Course Completed : <span className="font-bold">{profile.user.course_completed}</span></p>
                                <p className="">Topic Completed : <span className="font-bold">{profile.user.topic_completed}</span></p>
                                <p className="">Material Completed : <span className="font-bold">{profile.user.materials_completed}</span></p> */}
                            </div>
                            <div className="flex flex-col gap-2 mt-3 lg:mt-0">
                                <table className="w-min">
                                    <tr>
                                        <td><p className="text-nowrap">Quiz Completed </p></td>
                                        <td className="px-3"> : </td>
                                        <td> <span className="font-bold">{profile.user.quiz_completed}</span></td>
                                    </tr>
                                    <tr>
                                        <td><p className="text-nowrap">Quiz Point </p></td>
                                        <td className="px-3"> : </td>
                                        <td> <span className="font-bold">{profile.user.quiz_point}</span></td>
                                    </tr>
                                    <tr>
                                        <td><p className="text-nowrap">Daily Steak </p></td>
                                        <td className="px-3"> : </td>
                                        <td>  <span className="font-bold">5</span></td>
                                    </tr>
                                </table>
                                {/* <p className="">Quiz Completed : <span className="font-bold">{profile.user.quiz_completed}</span></p>
                                <p className=""> : <span className="font-bold">{profile.user.quiz_point}</span></p>
                                <p className="">Daily Steak : <span className="font-bold">5</span></p> */}
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 lg:mt-16 p-8 lg:p-20 lg:py-14 border-2 border-gray-400 rounded-3xl mb-12">
                        <h1 className="text-2xl font-bold">Course Completed</h1>
                        <div className="flex mt-10 gap-5">  
                            {profile.completedCourse.map((e)=>{
                                    setCompletedCourse(true)
                                    return(
                                        <div className="flex flex-col items-center">
                                            <img src={CoursePict} alt="a" className="w-52" />
                                            <p className="font-semibold text-sm lg:text-lg">{e.name}</p>
                                        </div>
                                    )
                                })}
                            {!completedCourse &&
                                <div>No course completed yet</div>
                            }
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}
