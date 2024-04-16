import illustration from "../../Assets/Illustration.png"
import Web from "../../Assets/web.png"
import SearchBar from "../../Components/SearchBar/SearchBar"
import Mentor from "../../Assets/mentor.png"
import Community from "../../Assets/community.png"
import start from "../../Assets/start.png"
import CheckUserLoggedIn  from "../../Hooks/CheckUser"
import { useEffect, useState } from "react"
import Navbar from '../../Components/Navbar/Navbar.js'
import Footer from '../../Components/Footer/Footer.js'

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
                <Navbar/>
                <div className="bg-OWL-base p-6 lg:px-24 overflow-hidden">
                    <div className="lg:flex lg:flex-row-reverse items-center justify-between mt-16">
                        <img src={illustration} alt='a' className="mb-8 w-72 mx-auto lg:mx-0 lg:w-96 lg:scale-125"/>
                        <div className="lg:w-1/2">
                            <p className="text-md pl-1 lg:text-xl tracking-widest text-OWL-dark-blue font-semibold">INTRODUCING OWL.</p>
                            <h3 className="text-xl font-bold pl-1 mt-4 lg:text-4xl">Eksplorasi Pembelajaran Terbaik di Dunia Digital!</h3>
                            <p className="text-sm mt-4 pl-1 lg:text-lg lg:mt-8">Buka Potensi Penuh Keterampilan Digital dengan Kursus Tentang Pengembangan Web, Mobile, Desain UI/UX, dan Manajemen Proyek.</p>
                            <div className="mt-6 lg:mt-20">
                                <SearchBar/>
                            </div>
                        </div>
                    </div>
                    <div className="bg-OWL-dark-blue flex flex-col lg:flex-row lg:justify-between gap-8 text-white p-6 mt-10 rounded-2xl lg:mt-44 lg:p-8 lg:pl-10">
                        <div className="flex flex-col gap-3 max-w-72 self-center lg:py-8">
                            <h2 className="lg:text-3xl">
                                <span className="font-semibold">OWL.</span>
                                <br/>
                                Program
                            </h2>
                            <p className="text-xs lg:text-base">Dirancang untuk mengembangkan keterampilan Anda di dunia digital</p>
                        </div>
                        <div className="flex gap-3 justify-between items-center lg:flex-col lg:w-min lg:p-8 lg:hover:bg-OWL-mid-blue lg:rounded-3xl">
                            <h2 className="text-sm lg:text-xl">Creative Thinking</h2>
                            <p className="text-xs text-nowrap lg:text-base">Learn more +</p>
                        </div>
                        <div className="flex gap-3 justify-between items-center lg:flex-col lg:w-min lg:p-8 lg:hover:bg-OWL-mid-blue lg:rounded-3xl">
                            <h2 className="text-sm lg:text-xl">Gamification</h2>
                            <p className="text-xs text-nowrap lg:text-base">Learn more +</p>
                        </div>
                        <div className="flex gap-3 justify-between items-center lg:flex-col lg:w-min lg:p-8 lg:hover:bg-OWL-mid-blue lg:rounded-3xl">
                            <h2 className="text-sm lg:text-xl">Interactive Learning</h2>
                            <p className="text-xs text-nowrap lg:text-base">Learn more +</p>
                        </div>
                    </div>
                    <div className="mt-14 flex flex-col lg:mt-40 lg:items-center">
                        <p className="font-medium text-OWL-dark-blue tracking-widest lg:font-semibold">COURSE</p>
                        <p className="font-bold text-lg lg:text-5xl mt-2">Full-Stack Mastery</p>
                        <p className="font-normal text-xs lg:mt-2 lg:text-xl">Dari Pengembangan Web hingga Applikasi Mobile, Desain UI/UX, dan Manajemen Proyek</p>
                        <div className="flex flex-col gap-4 mt-4 lg:flex-row lg:mt-16 lg:gap-12">
                            <div className="flex gap-2 lg:gap-12 lg:w-1/2">
                                <div className="w-1/2 flex flex-col">
                                    <img src={Web} alt="a"/>
                                    <p className="font-semibold text-sm lg:text-lg">Web Development</p>
                                    <p className="text-xs lg:text-sm">Dasar HTML, CSS dan JavaScript untuk pengembangan web</p>
                                </div>
                                <div className="w-1/2 flex flex-col">
                                    <img src={Web} alt="a"/>
                                    <p className="font-semibold text-sm lg:text-lg">Mobile Development</p>
                                    <p className="text-xs lg:text-sm">Pengembangan aplikasi responsif untuk Android dan iOS</p>
                                </div>
                            </div>      
                            <div className="flex gap-2 lg:gap-12 lg:w-1/2">
                                <div className="w-1/2 flex flex-col">
                                    <img src={Web} alt="a"/>
                                    <p className="font-semibold text-sm lg:text-lg">UI/UX Design </p>
                                    <p className="text-xs lg:text-sm">Mobile Development Pengembangan aplikasi responsif untuk Android dan iOS</p>
                                </div>
                                <div className="w-1/2 flex flex-col">
                                    <img src={Web} alt="a"/>
                                    <p className="font-semibold text-sm lg:text-lg">Project Manager</p>
                                    <p className="text-xs lg:text-sm">Keterampilan manajemen proyek dengan metodologi Agile</p>
                                </div>
                            </div> 
                        </div>
                    </div>
                    <div className="mt-20 flex flex-col items-start lg:mt-40 md:flex-row md:items-center">
                        <img src={Mentor} alt="a" className="w-1/2 self-center"/>
                        <div className="flex flex-col gap-1 lg:gap-5">
                            <p className="text-sm font-medium text-OWL-dark-blue tracking-widest lg:text-xl">MENTOR</p>
                            <p className="text-lg font-semibold leading-5 lg:text-5xl lg:w-4/5">Mentor Kursus Yang Berpengalaman</p>
                            <p className="text-xs font-light lg:text-lg">Mengembangkan keterampilan dari mentor terbaik</p>
                            <button className="bg-OWL-orange rounded-md text-sm mt-2 px-4 py-2 font-medium self-start lg:text-xl lg:py-3 lg:px8">Start Learning</button>
                        </div>
                    </div>
                    <img src={Community} alt="a" className="mt-14 lg:mt-40 lg:mx-auto lg:w-2/3"/>
                    <div className="flex justify-between mt-20 lg:mt-60">
                        <div className="bg-OWL-mid-blue text-white p-5 py-14 pr-20 rounded-3xl mt-5 lg:flex-1 lg:p-20 lg:py-32">
                            <h1 className="text-2xl py-3 font-semibold lg:text-5xl">Start Learning Now!</h1>
                            <p className="text-xs lg:text-xl lg:mt-10 lg:max-w-2xl">Auctor elit sed vulputate mi sit amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar</p>
                            <button className="bg-OWL-orange text-black rounded-md text-sm mt-6 px-4 py-2 font-medium lg:text-xl lg:py-3 lg:px8 lg:mt-10">Start Learning</button>
                        </div>
                        <div className="w-64 relative">
                            <img src={start} className="absolute -top-20 -right-6 lg:right-0 min-w-52 xl:min-w-96"/>
                        </div>
                    </div>
                </div>
                <Footer />

            </>
        )
    }

    
}