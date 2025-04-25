import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useVoting } from "../../context/VotingContext";
import CandidateCard from "./CandidateCard";

const CandidateForm = ({ candidates }) => {
  return (
    <div className="flex gap-4">
      {candidates.map((person, index) => {
        return <CandidateCard candidate={person} />;
      })}
    </div>
  );
};

export default CandidateForm;
