import learn from "../../Assets/learn.png"
import Web from "../../Assets/web.png"
import SearchBar from "../../Components/SearchBar/SearchBar"
import Mentor from "../../Assets/mentor.png"
import Community from "../../Assets/community.png"
import start from "../../Assets/start.png"
import CheckUserLoggedIn  from "../../Hooks/CheckUser"
import { useEffect, useState } from "react"
import Footer from '../../Components/Footer/Footer.js'
import { Link, useParams } from "react-router-dom"
import ProgressBar from "../../Components/course/ProgressBar.js"
import Questions from "../../Components/quiz/Questions.js"

export default function QuizPage(){

    const {course} = useParams();
    const courseId = course == "web-development"? 1 : course == "mobile-development"? 2 : course == "ui-ux"? 3 : course == "project-manager"? 4 : 5
    const {topic} = useParams();

    const [isLoading, setLoading] = useState(true);
    const [questions, setQuestions] = useState();
    const [counter, setCounter] = useState(0);
    const [answers, setAnswers] = useState([]);
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
        topics?fetchQuiz():
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

    const fetchQuiz = async () => {

        fetch('https://nodejsdeployowl.et.r.appspot.com/getQuiz/' + topics.id)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setQuestions(data.data)
            console.log(data.data)

        });
    }

    const minCounter = ()=>{
        setCounter(counter-1)
    }

    const plusCounter = ()=>{
        setCounter(counter-1)
    }

    

    if(isLoading){
        return(<>Loading</>)
    }else{
        return (
            <>
                <div className="bg-OWL-base p-6 lg:px-32 overflow-hidden">
                    <h1 className="text-l lg:text-2xl mt-4 text-center mb-2">{topics? topics.name:""}</h1>
                    <ProgressBar progress={50}/>
                    <div className="flex gap-20 mt-20 items-center mb-20">
                        <button className="text-4xl" onClick={minCounter()}> - </button>
                        <div className="w-full flex flex-col items-center gap-10">
                            <h1 className="text-2xl font-semibold mb-10">{questions? questions[counter].question : ""}</h1>
                            {
                                questions? questions[counter].multiple_choice.map((choice, index)=>(
                                    <button className="w-full bg-white rounded-xl p-2 text-xl hover:bg-OWL-light-blue hover:font-semibold border-2 border-OWL-light-blue focus:bg-OWL-light-blue focus:font-semibold">
                                        {choice}
                                    </button>
                                )) 
                                : ""
                            }
                        </div>
                        <button className="text-4xl" onClick={plusCounter()}> + </button>
                    </div>
                </div>
                <Footer />

            </>
        )
    }

    
}