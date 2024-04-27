import CheckUserLoggedIn  from "../../Hooks/CheckUser"
import { useEffect, useState } from "react"
import Navbar from '../../Components/Navbar/Navbar.js'
import Web from "../../Assets/web.png"
import code from "../../Assets/coursepict.png"
import Footer from "../../Components/Footer/Footer.js"
import Cards from "../../Components/course/Card.js"
import ProgressBar from "../../Components/course/ProgressBar.js"
import { IoMdCreate, IoIosAlbums } from "react-icons/io";
import SearchBar from "../../Components/SearchBar/SearchBar.js"
import supabase from "../../Middleware/Supabase.js"

export default function CoursePage(){


    const [isLoading, setLoading] = useState(true);

    const [courses, getCourses] = useState([]);

    useEffect(() => {
        fetchCourseData();
    }, [])

    const fetchCourseData = async () => {
        const {data, error} = await supabase.from('courses').select('*');
        if(error){
            throw error;
        }else{
            getCourses(data);
            console.log(data);
            
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
    }, [])


    if(isLoading){
        return(<>Loading</>)
    }else{
        return (
            <>
                <Navbar/>
                <div className="bg-OWL-base p-6 lg:px-24 overflow-hidden">

                    <div className="flex flex-col lg:flex-row lg:gap-10">
                        <img src={Web} className="w-60 self-center aspect-square lg:w-2/5"/>
                        <div className="lg:flex lg:flex-col lg:justify-center gap-4 lg:w-full">
                            <div>
                                <h1 className="font-bold text-xl lg:text-4xl">Web Development</h1>
                                <p className="flex items-center lg:text-2xl"><IoIosAlbums className="mr-1"/> 6 topics <IoMdCreate size={20} className="ml-4"/> 49 Material</p>
                            </div>
                            <div className="mt-3 text-gray-700 lg:text-xl">
                                <p>Your journey</p>
                                <ProgressBar progress="80"/>
                            </div>
                            <div className="mt-4 lg:text-xl">
                                <p className="font-semibold">Jump to the recently studied</p>
                                <div className="border-2 border-gray-300 rounded-md p-2 mt-2 flex gap-3 lg:p-6">
                                    <img src={code} className="aspect-square h-16 rounded-md lg:h-24"/>
                                    <div className="lg:w-full lg:flex lg:flex-col lg:justify-around">
                                        <h1 className="font-semibold">Topic: FrontEnd - HTML</h1>
                                        <p className="flex items-center text-sm"><IoMdCreate size={20} className="mr-2"/> 5 Material</p>
                                        <ProgressBar progress="69"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 lg:mt-20">
                        <p className="text-center text-sm lg:text-xl">Web Develompent</p>
                        <h1 className="text-center font-bold mb-10 tracking-widest text-lg lg:text-4xl">Learning Path</h1>
                        <div className="w-auto lg:w-3/5 mx-auto">
                        <SearchBar/>
                        </div>
                    </div>



                    <div className="mt-32">
                        <h1 className="text-xl font-bold lg:text-3xl">FrontEnd - HTML</h1>
                        <div className="flex flex-col lg:flex-col-reverse mt-8 lg:mt-0">
                            <div className="flex flex-wrap justify-around gap-4 gap-y-8">
                                <Cards text="yessir" img={code}/>
                                <Cards text="yessir" img={code}/>
                                <Cards text="yessir" img={code}/>
                                <Cards text="yessir" img={code}/>
                            </div>
                            <button className="self-start lg:self-end mt-8 lg:mt-0 lg:mb-0 lg:-translate-y-full bg-OWL-mid-blue text-white font-semibold text-sm p-2 px-4 rounded-lg lg:text-xl">See More</button>
                        </div>
                    </div>

                    <div className="mt-32">
                        <h1 className="text-xl font-bold lg:text-3xl">FrontEnd - CSS</h1>
                        <div className="flex flex-col lg:flex-col-reverse mt-8 lg:mt-0">
                            <div className="flex flex-wrap justify-around gap-4 gap-y-8">
                                <Cards text="yessir" img={code}/>
                                <Cards text="yessir" img={code}/>
                                <Cards text="yessir" img={code}/>
                                <Cards text="yessir" img={code}/>
                            </div>
                            <button className="self-start lg:self-end mt-8 lg:mt-0 lg:mb-0 lg:-translate-y-full bg-OWL-mid-blue text-white font-semibold text-sm p-2 px-4 rounded-lg lg:text-xl">See More</button>
                        </div>
                    </div>

                    <div className="mt-32">
                        <h1 className="text-xl font-bold lg:text-3xl">FrontEnd - Javascript</h1>
                        <div className="flex flex-col lg:flex-col-reverse mt-8 lg:mt-0">
                            <div className="flex flex-wrap justify-around gap-4 gap-y-8">
                                <Cards text="yessir" img={code}/>
                                <Cards text="yessir" img={code}/>
                                <Cards text="yessir" img={code}/>
                                <Cards text="yessir" img={code}/>
                            </div>
                            <button className="self-start lg:self-end mt-8 lg:mt-0 lg:mb-0 lg:-translate-y-full bg-OWL-mid-blue text-white font-semibold text-sm p-2 px-4 rounded-lg lg:text-xl">See More</button>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }


}