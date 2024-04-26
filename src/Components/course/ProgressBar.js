import React from "react";

export default function ProgressBar(props) {
  return (
    <>
      <div className="flex">
        <div className="w-full bg-gray-300 my-2 mr-3 rounded-2xl">
            <div style={{width: props.progress + "%"}} className="bg-OWL-dark-blue h-full rounded-2xl"></div>
        </div>
        <p>{props.progress}%</p>
      </div>
    </>
  );
}