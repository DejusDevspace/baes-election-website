import React from "react";

const CandidateCard = ({ candidate }) => {
  return (
    <div
      className="flex flex-col gap-4 justify-center items-center text-center
    bg-gray-500 p-4"
    >
      <img src={candidate.image} alt="" />
      <h2>{candidate.name}</h2>
      <p>
        {candidate.department}, {candidate.level}
      </p>
      <div className="flex gap-2">
        <input
          type="checkbox"
          name="candidatePosition"
          value={candidate.id}
          onClick={() => console.log("Clicked")}
          required
        />
        <p>Vote</p>
      </div>
    </div>
  );
};

export default CandidateCard;
