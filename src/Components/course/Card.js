import React from "react";

export default function Cards(props) {
  return (
    <>
      <div className="bg-white border-2 border-gray-400 rounded-2xl p-4 lg:p-10">
        <img src={props.img} className="w-28 lg:w-52 rounded-2xl aspect-square"/>
        <p>{props.text}</p>
      </div>
    </>
  );
}