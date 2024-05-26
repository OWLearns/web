import loading from "../../Assets/loading.svg"
import CheckUserLoggedIn  from "../../Hooks/CheckUser"
import { useEffect, useState } from "react"
import Footer from '../../Components/Footer/Footer.js'
import { Link, Navigate, useParams } from "react-router-dom"
import ProgressBar from "../../Components/course/ProgressBar.js"
import Questions from "../../Components/quiz/Questions.js"
import supabase from "../../Middleware/Supabase.js"
import { WindowOutlined } from "@mui/icons-material"

export default function QuizPage(){

    const {course} = useParams();
    const courseId = course === "web-development"? 1 : course === "mobile-development"? 2 : course === "ui-ux"? 3 : course === "project-manager"? 4 : 5
    const {topic} = useParams();

    const [isLoading, setLoading] = useState(true);
    const [questions, setQuestions] = useState();
    const [counter, setCounter] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [topics, setTopics] = useState();
    const [start, setStart] = useState(false)
    const [finished, setFinished] = useState(false)
    const [finalscore, setFinalScore] = useState(0)
    const [, forceRender] = useState(undefined);

    // console.log(questions)

    useEffect(() => {
        const check = async () => {
            const isLoggedIn = await CheckUserLoggedIn();
            if (isLoggedIn) {
                // setLoading(false);
            } else {
                window.location.href = '/login';
            }
        }
        check();

        fetchTopics();
    }, [course])    
    
    useEffect(() => {
        // console.log(topics)
        if(topics){
            fetchQuiz();
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
                console.log(data.data)
                // setTopics(data.data)
                // console.log(data.data)
                for (const a of data.data) {
                    if(a.name.replace(/\s+/g, '-').toLowerCase() == topic){
                        setTopics(a)
                        console.log(a)
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

    const fetchQuiz = async () => {
        try {
            console.log(topics)
            console.log(topics.id)
            const response = await fetch('https://nodejsdeployowl.et.r.appspot.com/getQuiz/' + topics.id);
            if (response.ok) {
                const data = await response.json();
                // console.log(data.data);
                setQuestions(data.data)
                setLoading(false);
                // return data;
            } else {
                console.log('gagal')
                window.href = "/learn/" + course + "/" + topic
            }
          } catch (error) {
            console.log('error', error);
            
          }
    }

    const minCounter = ()=>{
        if(counter > 0){
            setCounter(counter - 1)
        }
    }

    const plusCounter = ()=>{
        if(counter < questions.length - 1){
            setCounter(counter + 1)
        }
    }

    const answered = (index) => {
        let newAnswer = answers
        newAnswer[counter] = index
        setAnswers(newAnswer)
        forceRender(prev => !prev)

        setTimeout(() => {
            plusCounter()
        }, 300);
    }

    const submitQuiz = async () => {
        setFinished(true)
        let score = 0
        answers.forEach((answer,index) => {
            if(answer === questions[index].answer){
                score = score + 1
            }
        })
        score = Math.floor(score/questions.length * 100)
        console.log(score)

        setFinalScore(score)
        if(score >= 75){
            try {
                const getSession = await supabase.auth.getSession();
                const access_token = getSession.data.session.access_token;
                const response = await fetch('https://nodejsdeployowl.et.r.appspot.com/quizScore', {
                    method: 'POST',
                    body: JSON.stringify({
                        topicID : topics.id,
                        access_token: access_token,
                        score: score
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data.data);
                    // setQuestions(data.data)
                    // setLoading(false);
                    // return data;
                } else {
                    console.log('gagal')
                }
            } catch (error) {
                console.log('error', error);
                
            }
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
    }else if(!start){
        return(
            <>
                {!topics.quizAvailable &&
                    <Navigate to={"/learn/" + course + "/" + topic} replace={true} />
                }
                <div className=" p-6 lg:px-32 overflow-hidden grid place-items-center h-screen">
                    <div className="-translate-y-20 flex flex-col justify-center items-center p-4 rounded-xl border-2 border-gray-500 bg-white w-72 lg:w-96">
                        <h1 className="font-bold text-2xl">QUIZ</h1>
                        <p className="text-center mt-4">Test Your Knowledge in this quiz! answer each question correctly to get a high score and pass the quiz!</p>
                        <button onClick={()=>{setStart(true)}} className="mt-6 bg-blue-500 w-full text-white text-lg font-semibold p-1.5 rounded-xl">start quiz</button>
                        <Link to={"/learn/" + course + "/" + topic} className="mt-3 bg-white w-full text-blue-500 border-2 border-blue-500 text-lg font-semibold p-1.5 rounded-xl text-center">cancel</Link>
                    </div>
                </div>
                <Footer />
            </>
        )
    }else if(!finished){
        return (
            <>
                <div className="bg-OWL-base p-6 lg:px-32 overflow-hidden flex flex-col items-center">
                    <h1 className="text-l lg:text-2xl mt-4 text-center mb-2">{topics.name}</h1>
                    <div className="w-full">
                        <ProgressBar progress={Math.floor(answers.filter(String).length/questions.length * 100)}/>
                    </div>
                    {Math.floor(answers.filter(String).length/questions.length * 100) == 100 &&
                        <button className="p-3 mt-10 bg-white text-green-500 rounded-xl font-semibold text-xl border-2 border-green-600 hover:bg-green-600 hover:font-bold hover:text-white" onClick={()=>submitQuiz()}>Complete Quiz</button>
                    }
                    <div className="flex gap-20 mt-20 items-center">
                        <button className="text-2xl lg:text-3xl" onClick={minCounter}> &lt; </button>
                        <h1 className=" text-lg lg:text-xl">Soal {counter+1}</h1>
                        <button className="text-2xl lg:text-3xl" onClick={plusCounter}> &gt; </button>
                    </div>
                    <div className="flex mt-10 items-center mb-20">
                        <div className="w-full flex flex-col items-center gap-4 lg:gap-6">
                            <h1 className="text-2xl lg:text-3xl font-semibold text-center lg:mb-4">{questions? questions[counter].question : ""}</h1>
                            {
                                questions[counter].multiple_choice.map((choice, index)=>(
                                    <button className={answers[counter] === index? "w-full rounded-xl p-2 text-lg lg:text-xl text-white bg-blue-500 font-semibold border-2 border-blue-500"   : "w-full bg-white rounded-xl p-2 text-lg lg:text-xl hover:bg-OWL-light-blue hover:text-white hover:font-semibold border-2 border-OWL-light-blue"  } onClick={() => answered(index)}>
                                        {choice}
                                    </button>
                                )) 
                            }
                        </div>
                    </div>
                   
                </div>
                <Footer />

            </>
        )
    } else {
        return(
            <>
                <div className="bg-OWL-base p-6 lg:px-32 overflow-hidden grid place-items-center h-screen">
                    <div className="-translate-y-20 flex flex-col justify-center items-center p-4 rounded-xl border-2 border-gray-500 bg-white w-72 lg:w-96">
                        <h1 className="font-bold text-2xl">QUIZ RESULT</h1>
                        <p className="text-center mt-6">Final score : <span className="font-semibold">{finalscore}</span></p>
                        {finalscore >= 75 && 
                            <p className="text-center mt-2">Congratulations you pass!</p>
                        }
                        {finalscore < 75 && 
                            <p className="text-center mt-2">Sorry, try again later</p>
                        }
                        <Link to={"/learn/" + course + "/" + topic} className="mt-6 bg-blue-500 w-full text-white text-lg font-semibold p-1.5 rounded-xl text-center">Back To Topic Page</Link>
                    </div>
                </div>
                <Footer />
                <div className="bg-OWL-base p-6 lg:px-32 overflow-hidden flex flex-col items-center h-screen">
                    <button onClick={()=>{window.href = "/learn/" + course + "/" + topic}}>finished</button>
                    <Link to={"/learn/" + course + "/" + topic}>back</Link>
                </div>
            </>
        )
    }

    
}