import React, { useState } from "react";
import CandidateCard from "./CandidateCard";

const CandidateForm = ({
  candidates,
  position,
  selectedCandidateId,
  onVote,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-4">
      {candidates.map((candidate) => (
        <label
          key={candidate.id}
          className={`flex flex-col items-center border rounded-lg p-4 cursor-pointer transition-all duration-300 w-60 
            ${
              selectedCandidateId === candidate.id
                ? "border-green-500 shadow-lg"
                : "border-gray-300"
            }
          `}
        >
          <input
            type="radio"
            name={position}
            value={candidate.id}
            checked={selectedCandidateId === candidate.id}
            onChange={() => onVote(position, candidate.id)}
            className="hidden"
          />
          <CandidateCard candidate={candidate} />
        </label>
      ))}
    </div>
  );
};

export default CandidateForm;
