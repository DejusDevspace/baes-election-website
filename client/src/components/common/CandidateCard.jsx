import React from "react";

const CandidateCard = ({ candidate }) => {
  return (
    <form className="flex flex-col gap-4 justify-center items-center text-center">
      <img src={candidate.img} alt="" />
      <h2>Candidate Name</h2>
      <p>Dept, level</p>
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
    </form>
  );
};

export default CandidateCard;
