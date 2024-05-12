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

export default function CoursePage() {
    const {course} = useParams();
    const courseId = course == "web-development"? 1 : course == "mobile-development"? 2 : course == "ui-ux"? 3 : course == "project-manager"? 4 : 5

    const [isLoading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    const [topics, setTopics] = useState([]);

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


        fetchCourseData();
        fetchTopics();
    }, [])

    const fetchCourseData = async () => {
        fetch('https://nodejsdeployowl.et.r.appspot.com/courses')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            for (const a of data.data) {
                if(a.id == courseId){
                    setCourses(a)
                }
            }
        });
    }
    
    const fetchTopics = async () => {
        fetch('https://nodejsdeployowl.et.r.appspot.com/topics/' + courseId)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data.data)
            setTopics(data.data)
        });
    }

    if (isLoading) {
        return (<>Loading</>)
    } else {
        return (
            <>
                <div className="bg-OWL-base p-6 lg:px-24 overflow-hidden">

                    <div className="flex flex-col lg:flex-row lg:gap-10">
                        <img src={courses.image} className="w-60 self-center aspect-square lg:w-2/5" />
                        <div className="lg:flex lg:flex-col lg:justify-center gap-4 lg:w-full">
                            <div>
                                <h1 key={courses.id} className="font-bold text-xl lg:text-4xl">{courses.name}</h1>
                                <p className="flex items-center lg:text-2xl"><IoIosAlbums className="mr-1" /> {courses.total_topics} topics <IoMdCreate size={20} className="ml-4" /> {courses.total_materials} Material</p>
                            </div>
                            <div className="mt-3 text-gray-700 lg:text-xl">
                                <p>Your journey</p>
                                <ProgressBar progress="80" />
                            </div>
                            <div className="mt-4 lg:text-xl">
                                <p className="font-semibold">Jump to the recently studied</p>
                                <div className="border-2 border-gray-300 rounded-md p-2 mt-2 flex gap-3 lg:p-6">
                                    <img src={code} className="aspect-square h-16 rounded-md lg:h-24" />
                                    <div className="lg:w-full lg:flex lg:flex-col lg:justify-around">
                                        {topics.map(topic => (
                                            <h1 key={topic.id} className="font-semibold">Topic: {topic.name} </h1>
                                        ))}

                                        <p className="flex items-center text-sm"><IoMdCreate size={20} className="mr-2" /> Material</p>
                                        <ProgressBar progress="69" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 lg:mt-20">
                        <p className="text-center text-sm lg:text-xl">Web Develompent</p>
                        <h1 className="text-center font-bold mb-10 tracking-widest text-lg lg:text-4xl">Learning Path</h1>
                        <div className="w-auto lg:w-3/5 mx-auto">
                            <SearchBar />
                        </div>
                    </div>


                    {
                        topics.map((topic)=>(
                            <TopicMaterials name={topic.name} id={topic.id} link={course}/>
                        ))
                    }

                </div>
                <Footer />
            </>
        )
    }


}