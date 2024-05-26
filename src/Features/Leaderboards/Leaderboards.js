import loading from "../../Assets/loading.svg"
import CheckUserLoggedIn from "../../Hooks/CheckUser"
import { useEffect, useState } from "react"
import Web from "../../Assets/web.png"
import code from "../../Assets/coursepict.png"
import Footer from "../../Components/Footer/Footer.js"
import TopicMaterials from "../../Components/course/TopicMaterials.js"
import ProgressBar from "../../Components/course/ProgressBar.js"
import { IoMdCreate, IoIosAlbums } from "react-icons/io";
import SearchBar from "../../Components/SearchBar/SearchBar.js"
import { useParams } from "react-router-dom"

export default function Leaderboard() {

    const [isLoading, setLoading] = useState(true);
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const check = async () => {
            const isLoggedIn = await CheckUserLoggedIn();
            if (isLoggedIn) {
                
            } else {
                window.location.href = '/login';
            }
        }
        check();

        fetchLeaderboard()
    }, [])

    const fetchLeaderboard = async () => {
        fetch('https://nodejsdeployowl.et.r.appspot.com/leaderboard')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setLeaderboard(data.data)
            setLoading(false);
        });
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
                <div className="bg-OWL-base p-6 lg:px-24 overflow-hidden pb-32">
                    <h1 className="font-bold text-2xl text-center mb-10 md:text-4xl">Leaderboard</h1>
                    <div className="flex flex-col gap-4 md:px-10 lg:px-32 xl:px-56">
                        {
                            leaderboard.map((leaderboard, index) => {
                                return (
                                    <div className="flex items-center gap-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white justify-between px-3 py-2 rounded-lg">
                                        <div className="flex items-center gap-2 md:gap-4">
                                            <h1 className="font-bold text-xl">{index+1}</h1>
                                            <img src={leaderboard.avatar} className="w-10 h-10 aspect-square rounded-full" />
                                            <p className="font-bold text-md">{leaderboard.username}</p>
                                        </div>
                                        <p className="font-bold text-md text-nowrap">level {Math.floor(leaderboard.exp/100) + 1}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <Footer />
            </>
        )
    }


}