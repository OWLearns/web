import { useEffect, useState } from "react"
import Cards from "./Card.js"
import { Link, useParams } from "react-router-dom"
import supabase from "../../Middleware/Supabase.js";

import coursePic from "../../Assets/coursePic.png"

export default function TopicMaterials(props) {
    const [materials, setMaterials] = useState([]);

    // console.log(materials)

    useEffect(() => {
        fetchMaterials(props.id);
    }, [])

    const fetchMaterials = async (id) => {

        // fetch('https://nodejsdeployowl.et.r.appspot.com/materials/' + id)
        // .then((res) => {
        //     return res.json();
        // })
        // .then((data) => {
        //     setMaterials(data.data)
        // });

        try {
            const getSession = await supabase.auth.getSession();
            const access_token = getSession.data.session.access_token;
            const response = await fetch('https://nodejsdeployowl.et.r.appspot.com/materials', {
                method: 'POST',
                body: JSON.stringify({
                    access_token: access_token,
                    topic_id : id,
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                // console.log(data.data);
                setMaterials(data.data)
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



        return (
            <>
                <div className="mt-12 mb-16 lg:mt-20">
                    <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-bold lg:text-3xl">{props.name}</h1>
                    <Link to={"/learn/" + props.link + "/" + props.name.replace(/\s+/g, '-').toLowerCase() } className="lg:mt-0 lg:mb-0 bg-OWL-mid-blue text-white font-semibold text-sm p-2 px-4 rounded-lg lg:text-xl">See More</Link>
                    </div>
                    {/* <div className="flex flex-col lg:flex-col-reverse mt-8 lg:mt-0"> */}
                        <div className="flex flex-wrap justify-evenly gap-4 gap-y-8">
                            {
                                materials.map((material , index)=>(
                                    index < 4? <Cards canClick={true} matID={material.id} text={material.title} img={coursePic} course={props.link} topic={props.name.replace(/\s+/g, '-').toLowerCase()} completed={material.completed}/>: <></>
                                ))
                            }
                        </div>
                    {/* </div> */}
                </div>
            </>
        )
}