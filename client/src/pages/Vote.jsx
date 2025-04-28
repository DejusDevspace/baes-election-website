import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useVoting } from "../context/VotingContext";
import CandidateCard from "../components/common/CandidateCard";
import { IoIosArrowDown } from "react-icons/io";
import CandidateForm from "../components/common/CandidateForm";

const Vote = () => {
  const { student } = useContext(AuthContext);
  const { candidates, positions } = useVoting();

  const executivePositions = positions.filter(
    (pos) => pos.position.toLowerCase() !== "senate head"
  );
  console.log("Executive Positions: ", executivePositions);

  const executiveCandidates = candidates.filter(
    (candidate) => candidate.position.toLowerCase() !== "senate head"
  );
  // console.log("Executive Candidates: ", executiveCandidates);

  const senatePositions = positions.filter(
    (pos) => pos.position.toLowerCase() === "senate head"
  );
  // console.log("Senate Head Positions: ", senatePositions);

  const senateHeadCandidates = candidates.filter(
    (candidate) =>
      candidate.position.toLowerCase() === "senate head" &&
      candidate.level === student.level &&
      candidate.department === student.department
  );
  // console.log("Senate Head Candidates: ", senateHeadCandidates);

  // Priority order for executive positions
  const positionPriority = [
    "President",
    "Vice President",
    "Senate Chairman",
    "Deputy Senate Chairman",
    "General Secretary",
    "Assistant General Secretary",
    "Treasurer",
    "Financial Secretary",
    "Sports Director",
    "Assistant Sports Director",
    "Social Director",
    "Assistant Social Director",
    "Academic Director",
    "Assistant Academic Director",
    "Welfare Director",
    "Assistant Welfare Director",
    "P.R.O",
  ];

  // Sorting function
  const sortedExecutivePositions = executivePositions.sort((a, b) => {
    const aPriority = positionPriority.indexOf(a.position);
    const bPriority = positionPriority.indexOf(b.position);

    // Positions not in list should go to the bottom
    if (aPriority === -1) return 1;
    if (bPriority === -1) return -1;

    return aPriority - bPriority;
  });

  // console.log("Sorted E Positions:", sortedExecutivePositions);

  const [isToggled, setIsToggled] = useState(0);

  const handleToggle = (id) => {
    if (isToggled === id) {
      setIsToggled(null);
    } else {
      setIsToggled(id);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col min-h-[90vh] py-12 gap-8">
        <h1 className="text-3xl">
          Welcome, <span className="text-special">{student.surname}</span>
        </h1>
        <div className="flex flex-col gap-4 justify-center items-center">
          <h2 className="text-3xl">Executive Candidates</h2>
          {sortedExecutivePositions.map((pos, index) => {
            return (
              <div key={index} className="flex flex-col w-full gap-6">
                <div
                  className="relative p-4 bg-gray-500 rounded-xl w-full flex justify-center items-center gap-8 
                text-center cursor-pointer"
                  onClick={() => handleToggle(index)}
                >
                  <h1 className="text-3xl">{pos.position}</h1>
                  <div className="absolute right-0 mx-4 self-end">
                    <IoIosArrowDown className="text-3xl" />
                  </div>
                </div>
                {index === isToggled && (
                  <CandidateForm
                    key={index}
                    candidates={executiveCandidates.filter((cand, index) => {
                      return cand.position === pos.position;
                    })}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <h2>Senate Candidates</h2>
        </div>
      </div>
    </div>
  );
};

export default Vote;
