import CheckUserLoggedIn  from "../../Hooks/CheckUser"
import { useEffect, useState } from "react"
import Footer from '../../Components/Footer/Footer.js'
import { useParams } from "react-router-dom"

export default function MaterialsPage(){
    const {course} = useParams();
    const courseId = course == "web-development"? 1 : course == "mobile-development"? 2 : course == "ui-ux"? 3 : course == "project-manager"? 4 : 5
    const {topic} = useParams();
    const {material} = useParams();

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
            // setMaterials(data.data)
            console.log(data.data)
            for (const a of data.data) {
                if(a.title.replace(/\s+/g, '-').toLowerCase() == material){
                    setMaterials(a)
                    console.log(a)
                }
            }
        });
    }



    if(isLoading){
        return(<>Loading</>)
    }else{
        return (
            <>
                <div className="bg-OWL-base p-6 lg:px-32 overflow-hidden">
                    {/* material {material} */}
                    <iframe className="w-full h-96" src={materials.yt_link}>
                    </iframe>
                    <h1 className="font-bold text-xl lg:text-4xl mt-16">{materials.title}</h1>
                    <p className="mt-8 mb-20">{materials.description}</p>
                </div>
                <Footer />

            </>
        )
    }

    
}