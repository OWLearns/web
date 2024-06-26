import React, { useContext } from "react";
import { Context } from "../../app";
import { IoIosCheckmarkCircle } from "react-icons/io";

export default function Cards(props) {
  const [materialID, setMaterialID] = useContext(Context);

  const handleClick = () => { 
    console.log('Before setting:', materialID); // Logs the current state
    setMaterialID(props.id);
    console.log('After setting:', props.id); // Logs the new value
    localStorage.setItem('materialID', props.matID);
    localStorage.setItem('topicID', props.topicID);

    // setTimeout(() => {
      console.log('Navigating to:', "/learn/" + props.course + "/" + props.topic + "/" + props.text.replace(/\s+/g, '-').toLowerCase());
      window.location.href = "/learn/" + props.course + "/" + props.topic + "/" + props.text.replace(/\s+/g, '-').toLowerCase();
    // }, 1000);
  }

  return (
    <>
    {props.canClick && 
    <button onClick={(handleClick)}>
      <div className="h-full bg-white border-2 border-gray-400 font-semibold rounded-2xl p-4 lg:p-10 relative w-36 lg:w-72">
        {props.completed && (
          <div className="absolute top-5 left-5"><IoIosCheckmarkCircle color="#00d636" size={30} className="lg:scale-150" /></div>
        )}
        <img src={props.img} className="w-28 lg:w-52 rounded-2xl aspect-square" alt="Material"/>
        <p className="mt-4 lg:text-xl">{props.text}</p>
      </div>
    </button>
    }
    {!props.canClick && 
    <button className="cursor-default">
      <div className="h-full bg-white border-2 border-gray-400 font-semibold rounded-2xl p-4 lg:p-10 relative  w-36 lg:w-72">
        {props.completed && (
          <div className="absolute top-5 left-5"><IoIosCheckmarkCircle color="#00d636" size={30} className="lg:scale-150" /></div>
        )}
        <img src={props.img} className="w-28 lg:w-52 rounded-2xl aspect-square grayscale" alt="Material"/>
        <p className="mt-4 lg:text-xl">{props.text}</p>
      </div>
    </button>
    }
    </>
  );
}
