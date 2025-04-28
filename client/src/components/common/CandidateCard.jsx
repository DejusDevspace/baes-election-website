import React from "react";

const CandidateCard = ({ candidate }) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={candidate.image}
        alt={candidate.name}
        className="w-24 h-24 object-cover rounded-full mb-3"
      />
      <h2 className="text-xl font-semibold">{candidate.name}</h2>
      <p className="text-sm text-gray-400">
        {candidate.department}, {candidate.level} Level
      </p>
    </div>
  );
};

export default CandidateCard;
