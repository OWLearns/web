import CheckUserLoggedIn  from "../../Hooks/CheckUser"
import { useContext, useEffect, useState } from "react"
import Footer from '../../Components/Footer/Footer.js'
import { Link, useParams } from "react-router-dom"
import supabase from "../../Middleware/Supabase.js";
import { Context } from "../../app.js";

export default function MaterialsPage(){
    const {course} = useParams();
    const courseId = course == "web-development"? 1 : course == "mobile-development"? 2 : course == "ui-ux"? 3 : course == "project-manager"? 4 : 5
    const {topic} = useParams();
    const {material} = useParams();

    
    const [isLoading, setLoading] = useState(true);
    const [materials, setMaterials] = useState([]);
    const [topics, setTopics] = useState();
    
    const [materialID, setMaterialID] = useState([])
    // const [materialID, setMaterialID] = useContext(Context)

    console.log(materialID)
    console.log(materials.id)

    useEffect(() => {
        setMaterialID(localStorage.getItem('materialID'))

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
    }, [])
    
    useEffect(() => {
        topics?fetchMaterials():
        console.log(topics)
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

    const fetchMaterials = async () => {

        // fetch('https://nodejsdeployowl.et.r.appspot.com/materials/' + topics.id)
        // .then((res) => {
        //     return res.json();
        // })
        // .then((data) => {
        //     // setMaterials(data.data)
        //     console.log(data.data)
        //     for (const a of data.data) {
        //         if(a.title.replace(/\s+/g, '-').toLowerCase() == material){
        //             setMaterials(a)
        //             console.log(a)
        //         }
        //     }
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
                // setMaterials(data.data)
                for (const a of data.data) {
                    if(a.id == materialID){
                        setMaterials(a)
                        console.log(a)
                        console.log(a.id)
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

    function getId(url) {
        let regex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
        return regex.exec(url)[3];
      }

    const complete = async () => {
        try {
            const getSession = await supabase.auth.getSession();
            const access_token = getSession.data.session.access_token;
            const response = await fetch('https://nodejsdeployowl.et.r.appspot.com/materialCompleted', {
                method: 'POST',
                body: JSON.stringify({
                    access_token: access_token,
                    materials_id : materials.id,
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.data);
                // setMaterials(data.data)
                // for (const a of data.data) {
                //     if(a.title.replace(/\s+/g, '-').toLowerCase() == material){
                //         setMaterials(a)
                //         console.log(a)
                //     }
                // }
                // setQuestions(data.data)
                // setLoading(false);
                // return data;
                window.location.href = '/learn/' + course + '/' + topic
            } else {
                console.log('gagal')
            }
        } catch (error) {
            console.log('error', error);
            
        }


    }



    if(isLoading){
        return(<>Loading</>)
    }else{
        return (
            <>
                <div className="bg-OWL-base p-6 lg:px-32 overflow-hidden">
                    <Link to={"/learn/" + course + "/" + topic}>back</Link>
                    {/* material {material} */}
                    <iframe className="w-full min-h-96 transition-all duration-500 focus:aspect-video active:aspect-video" src={"https://www.youtube.com/embed/" + getId(materials.yt_link)}>
                    </iframe>
                    <h1 className="font-bold text-xl lg:text-4xl mt-16">{materials.title}</h1>
                    <p className="mt-8 mb-20">{materials.description}</p>
                    <button className='mt-20 text-sm text-center border-2 text-blue-400 border-blue-400 rounded-3xl px-4 py-2 w-full  hover:bg-blue-600 hover:text-white' onClick={complete}> Complete Course</button>
                </div>
                <Footer />

            </>
        )
    }

    
}