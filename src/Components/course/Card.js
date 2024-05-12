import React from "react";
import { Link } from "react-router-dom";

export default function Cards(props) {
  return (
    <Link to={"/learn/" + props.course + "/" + props.topic + "/" + props.text.replace(/\s+/g, '-').toLowerCase()}>
      <div className="bg-white border-2 border-gray-400 font-semibold rounded-2xl p-4 lg:p-10">
        <img src={props.img} className="w-28 lg:w-52 rounded-2xl aspect-square"/>
        <p>{props.text}</p>
      </div>
    </Link>
  );
}