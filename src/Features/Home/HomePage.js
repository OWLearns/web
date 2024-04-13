import illustration from "../../Assets/Illustration.png"
import Web from "../../Assets/web.png"
import SearchBar from "../../Components/SearchBar/SearchBar"
import Mentor from "../../Assets/mentor.png"
import Community from "../../Assets/community.png"
import CheckUserLoggedIn  from "../../Hooks/CheckUser"
import { useEffect, useState } from "react"
import LogOut from '../../Hooks/LogOut'

export default function TestPage(){

    const [isLoading, setLoading] = useState(true);

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
    }, [])


    if(isLoading){
        return(<>Loading</>)
    }else{
        return (
            <>
                <div className="bg-OWL-base p-6">
                    <button onClick={LogOut}>Log Out</button>
                    <div>
                        <img src={illustration} alt='a' className="mb-8 w-72 mx-auto"/>
                        <div>
                            <h3 className="text-xl font-bold pl-1">Eksplorasi Pembelajaran Terbaik di Dunia Digital!</h3>
                            <p className="text-sm mt-4 pl-1">Buka Potensi Penuh Keterampilan Digital dengan Kursus Tentang Pengembangan Web, Mobile, Desain UI/UX, dan Manajemen Proyek.</p>
                            <div className="mt-6">
                                <SearchBar/>
                            </div>
                        </div>
                    </div>
                    <div className="bg-OWL-dark-blue flex flex-col gap-8 text-white p-6 mt-10 rounded-2xl">
                        <div className="flex flex-col gap-3">
                            <h2>
                                <span className="font-semibold">OWL.</span>
                                <br/>
                                Program
                            </h2>
                            <p className="text-xs">Dirancang untuk mengembangkan keterampilan Anda di dunia digital</p>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex gap-3 justify-between items-center">
                                <h2 className="text-sm">Creative Thinking</h2>
                                <p className="text-xs text-nowrap">Learn more +</p>
                            </div>
                            <div className="flex gap-3 justify-between items-center">
                                <h2 className="text-sm">Gamification</h2>
                                <p className="text-xs text-nowrap">Learn more +</p>
                            </div>
                            <div className="flex gap-3 justify-between items-center">
                                <h2 className="text-sm">Interactive Learning</h2>
                                <p className="text-xs text-nowrap">Learn more +</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-14 flex flex-col">
                        <p className="font-medium">COURSE</p>
                        <p className="font-bold text-lg">Full-Stack Mastery</p>
                        <p className="font-normal text-xs">Dari Pengembangan Web hingga Applikasi Mobile, Desain UI/UX, dan Manajemen Proyek</p>
                        <div className="flex flex-col gap-4 mt-4">
                            <div className="flex gap-2">
                                <div className="w-1/2 flex flex-col">
                                    <img src={Web} alt="a"/>
                                    <p className="font-semibold text-sm">Web Development</p>
                                    <p className="text-xs">Dasar HTML, CSS dan JavaScript untuk pengembangan web</p>
                                </div>
                                <div className="w-1/2 flex flex-col">
                                    <img src={Web} alt="a"/>
                                    <p className="font-semibold text-sm">Web Development</p>
                                    <p className="text-xs">Dasar HTML, CSS dan JavaScript untuk pengembangan web</p>
                                </div>
                            </div>      
                            <div className="flex gap-2">
                                <div className="w-1/2 flex flex-col">
                                    <img src={Web} alt="a"/>
                                    <p className="font-semibold text-sm">Web Development</p>
                                    <p className="text-xs">Dasar HTML, CSS dan JavaScript untuk pengembangan web</p>
                                </div>
                                <div className="w-1/2 flex flex-col">
                                    <img src={Web} alt="a"/>
                                    <p className="font-semibold text-sm">Web Development</p>
                                    <p className="text-xs">Dasar HTML, CSS dan JavaScript untuk pengembangan web</p>
                                </div>
                            </div> 
                        </div>
                    </div>
                    <div className="mt-20 flex flex-col items-start">
                        <img src={Mentor} alt="a"/>
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium">MENTOR</p>
                            <p className="text-lg font-semibold leading-5">Mentor Kursus Yang Berpengalaman</p>
                            <p className="text-xs font-light">Mengembangkan keterampilan dari mentor terbaik</p>
                        </div>
                        <button className="bg-OWL-orange rounded-md text-sm mt-2 px-4 py-2 font-medium">Start Learning</button>
                    </div>
                    <img src={Community} alt="a" className="mt-14"/>
                </div>
            </>
        )
    }

    
}