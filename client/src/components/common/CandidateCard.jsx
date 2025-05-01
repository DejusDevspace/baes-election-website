import React from "react";

const CandidateCard = ({ candidate }) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={`/candidates/${candidate.image}`}
        alt={candidate.name}
        className="w-full object-cover rounded-md mb-3"
      />
      <h2 className="text-xl font-semibold">{candidate.name}</h2>
      <p className="text-sm text-gray-400">
        {candidate.department === "Mechatronics Engineering" ? "MCT" : "EEE"},{" "}
        {candidate.level} Level
      </p>
    </div>
  );
};

export default CandidateCard;
