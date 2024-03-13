import React from "react";

type Props = {};

const EmptyJobs = (props: Props) => {
  return (
    <div className="bg-white p-8 rounded-2xl" style={{ width: 800 }}>
      <div className="flex flex-col justify-center outline-dashed outline-2 outline-offset-4 outline-gray-400 p-16">
        <img src="/img/3129575.jpg" width={200} className="self-center"></img>
        <div
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 20,
            fontWeight: 500,
            marginTop: 16,
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          No jobs booked yet
        </div>
      </div>
    </div>
  );
};

export default EmptyJobs;
