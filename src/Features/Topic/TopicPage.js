import learn from "../../Assets/learn.png"
import Web from "../../Assets/web.png"
import SearchBar from "../../Components/SearchBar/SearchBar"
import Mentor from "../../Assets/mentor.png"
import Community from "../../Assets/community.png"
import start from "../../Assets/start.png"
import Cards from "../../Components/course/Card.js"
import CheckUserLoggedIn  from "../../Hooks/CheckUser"
import { useEffect, useState } from "react"
import Footer from '../../Components/Footer/Footer.js'
import { Link,useParams } from "react-router-dom"
import { IoIosAlbums, IoMdCreate } from "react-icons/io"
import ProgressBar from "../../Components/course/ProgressBar.js"

export default function TopicPage(){
    const {course} = useParams();
    const courseId = course == "web-development"? 1 : course == "mobile-development"? 2 : course == "ui-ux"? 3 : course == "project-manager"? 4 : 5
    const {topic} = useParams();

    const [isLoading, setLoading] = useState(true);
    const [materials, setMaterials] = useState([]);
    const [topics, setTopics] = useState();

    // console.log(materials)

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

        fetchTopics();
    }, [])
    
    useEffect(() => {
        topics?fetchMaterials():
        console.log(topics)
    }, [topics])
    

    const fetchTopics = async () => {
        fetch('https://nodejsdeployowl.et.r.appspot.com/topics/' + courseId)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data.data)
            for (const a of data.data) {
                if(a.name.replace(/\s+/g, '-').toLowerCase() == topic){
                    setTopics(a)
                    console.log(a)
                }
            }
            // setTopics(data.data)
        });
    }

    const fetchMaterials = async () => {

        fetch('https://nodejsdeployowl.et.r.appspot.com/materials/' + topics.id)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setMaterials(data.data)
            // console.log(data.data)
        });
    }




    if(isLoading){
        return(<>Loading</>)
    }else{
        return (
            <>
                <div className="bg-OWL-base p-6 lg:px-24 overflow-hidden">
                    <div className="mt-10">
                        <h1 className="font-bold text-xl lg:text-4xl">{topics?topics.name:""}</h1>
                        <p className="flex items-center lg:text-2xl mt-1"><IoMdCreate size={20} /> 5 Material</p>
                    </div>
                    <div className="mt-8 text-gray-700 lg:text-xl w-1/2">
                        <p>Your journey</p>
                        <ProgressBar progress="80" />
                        <div className="mt-8">
                            <SearchBar />
                        </div>
                    </div>
                    <div className="mt-24">
                        <h1 className="font-semibold text-l lg:text-3xl">Daftar Materi</h1>
                        <div className="flex flex-wrap justify-between gap-4 gap-y-8">
                            {
                                materials.map((material)=>(
                                    <Cards text={material.title} img={material.image} course={course} topic={topic}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <Footer />

            </>
        )
    }

    
}