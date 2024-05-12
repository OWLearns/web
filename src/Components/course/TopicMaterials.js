import { useEffect, useState } from "react"
import Cards from "./Card.js"
import { Link, useParams } from "react-router-dom"

export default function TopicMaterials(props) {
    const [materials, setMaterials] = useState([]);

    // console.log(materials)

    useEffect(() => {
        fetchMaterials(props.id);
    }, [])

    const fetchMaterials = async (id) => {

        fetch('https://nodejsdeployowl.et.r.appspot.com/materials/' + id)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setMaterials(data.data)
        });
    }



        return (
            <>
                <div className="mt-32">
                    <h1 className="text-xl font-bold lg:text-3xl">{props.name}</h1>
                    <div className="flex flex-col lg:flex-col-reverse mt-8 lg:mt-0">
                        <div className="flex flex-wrap justify-between gap-4 gap-y-8">
                            {
                                materials.map((material , index)=>(
                                    index < 4? <Cards text={material.title} img={material.image} course={props.link} topic={props.name.replace(/\s+/g, '-').toLowerCase()} /> : <></>
                                ))
                            }
                        </div>
                        <Link to={"/learn/" + props.link + "/" + props.name.replace(/\s+/g, '-').toLowerCase() } className="self-start lg:self-end mt-8 lg:mt-0 lg:mb-0 lg:-translate-y-full bg-OWL-mid-blue text-white font-semibold text-sm p-2 px-4 rounded-lg lg:text-xl">See More</Link>
                    </div>
                </div>
            </>
        )
}