import loading from "../../Assets/loading.svg"
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
import supabase from "../../Middleware/Supabase.js"
import coursePic from "../../Assets/coursePic.png"

export default function TopicPage(){
    const {course} = useParams();
    const courseId = course == "web-development"? 1 : course == "mobile-development"? 2 : course == "ui-ux"? 3 : course == "project-manager"? 4 : 5
    const {topic} = useParams();

    const [isLoading, setLoading] = useState(true);
    const [materials, setMaterials] = useState([]);
    const [materialsCompleted, setMaterialsCompleted] = useState(0);
    const [topics, setTopics] = useState();

    console.log(materialsCompleted)

    useEffect(() => {
        const check = async () => {
            const isLoggedIn = await CheckUserLoggedIn();
            if (isLoggedIn) {
                
            } else {
                window.location.href = '/login';
            }
        }
        check();

        fetchTopics();
    }, [])
    
    useEffect(() => {
        if(topics){
            fetchMaterials();
        }
    }, [topics])
    

       
    const fetchTopics = async () => {
        try {
            const getSession = await supabase.auth.getSession();
            const access_token = getSession.data.session.access_token;
            const response = await fetch('https://nodejsdeployowl.et.r.appspot.com/topics/' + courseId, {
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
                // console.log(data.data)
                // setTopics(data.data)
                // console.log(data.data)
                for (const a of data.data) {
                    if(a.name.replace(/\s+/g, '-').toLowerCase() == topic){
                        setTopics(a)
                        // console.log(a)
                    }
                }
                // setLoading(false);
                // return data;
            } else {
                console.log('gagal')
            }
          } catch (error) {
            console.log('error', error);
            
          }
    }

    const fetchMaterials = async () => {
        console.log(topics.id)
        // fetch('https://nodejsdeployowl.et.r.appspot.com/materials/' + topics.id)
        // .then((res) => {
        //     return res.json();
        // })
        // .then((data) => {
        //     setMaterials(data.data)
        //     console.log(data.data)
        //     setLoading(false);
        // });

        try {
            const getSession = await supabase.auth.getSession();
            const access_token = getSession.data.session.access_token;
            const response = await fetch('https://nodejsdeployowl.et.r.appspot.com/materials', {
                method: 'POST',
                body: JSON.stringify({
                    access_token: access_token,
                    topic_id : topics.id,
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.data);
                setMaterials(data.data)
                for (const a of data.data) {
                    if(a.completed){
                        console.log(a.completed)
                        setMaterialsCompleted((prev) => prev+1)
                    }
                }
                // setQuestions(data.data)
                // setLoading(false);
                // return data;
                setLoading(false);
            } else {
                console.log('gagal')
            }
        } catch (error) {
            console.log('error', error);
            
        }
    }




    if(isLoading){
        return (
            <>
                <div className="absolute top-0 left-0 z-0 w-full h-screen grid place-items-center  bg-OWL-base">
                    <img src={loading} className="w-44 lg:w-72 aspect-square"/>
                </div>
            </>
            )
    }else{
        return (
            <>
                <div className=" p-6 lg:px-24 overflow-hidden">
                    <div className="mt-10 flex flex-col justify-center items-center">
                        <h1 className="font-bold text-xl lg:text-4xl">{topics?topics.name:""}</h1>
                        <Link to={"/learn/" + course} className="text-md lg:text-xl">{course.replace('-', " ")}</Link>
                        <p className="flex items-center lg:text-2xl mt-1"><IoMdCreate size={20} /> {materials.length} Material</p>
                    </div>
                    <div className="mt-8 text-gray-700 lg:text-xl text-center px-10">
                        <p>Your journey</p>
                        <div className="translate-x-3">
                        <ProgressBar progress={Math.floor((materialsCompleted/2)/materials.length*100)}/>
                        </div>
                    </div>
                    <h1 className="mt-12 font-semibold text-xl lg:text-3xl">Daftar Materi</h1>
                    <div className="mt-8 mb-16 flex justify-center">
                        <div className="flex flex-wrap gap-14 gap-y-8">
                            {
                                materials.map((material)=>(
                                    <Cards canClick={true} matID={material.id} topicID={topics.id} text={material.title} img={coursePic} completed={material.completed} course={course} topic={topic}/>
                                ))
                            }   
                            <Cards text={"quiz"} canClick={topics.quizAvailable} img={coursePic} course={course} topic={topic}/>
                        </div>
                    </div>
                </div>
                <Footer />

            </>
        )
    }

    
}