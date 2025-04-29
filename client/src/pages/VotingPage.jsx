import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useVoting } from "../context/VotingContext";
import { IoIosArrowDown } from "react-icons/io";
import CandidateForm from "../components/common/CandidateForm";
import Modal from "../components/common/Modal";

const VotingPage = () => {
  const { student } = useContext(AuthContext);
  const { candidates, positions, castVote, hasVoted } = useVoting();
  const [votes, setVotes] = useState({});
  const [isToggled, setIsToggled] = useState(0);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const executivePositions = positions.filter(
    (pos) => pos.position.toLowerCase() !== "senate head"
  );

  const executiveCandidates = candidates.filter(
    (candidate) => candidate.position.toLowerCase() !== "senate head"
  );

  const senateHeadPositions = positions.filter(
    (pos) => pos.position.toLowerCase() === "senate head"
  );

  const senateHeadCandidates = candidates.filter(
    (candidate) =>
      candidate.position.toLowerCase() === "senate head" &&
      candidate.level === student.level &&
      candidate.department === student.department
  );

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

  const handleToggle = (id) => {
    if (isToggled === id) {
      setIsToggled(null);
    } else {
      setIsToggled(id);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleVote = (position, candidateId) => {
    setVotes((prev) => ({
      ...prev,
      [position]: candidateId,
    }));
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);

    try {
      // console.log("Submitting votes:", votes);
      // Send votes to backend
      await castVote(votes);
      alert("Votes submitted successfully!");
      // Redirect user
      navigate("/response-recorded");
    } catch (error) {
      console.error("Error submitting votes:", error);
      alert("Failed to submit votes");
    } finally {
      setIsSubmitting(false);
      setShowModal(false);
    }
  };

  const allPositions = [...sortedExecutivePositions, ...senateHeadPositions];
  const allPositionsVoted = allPositions.every((pos) => votes[pos.position]);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col min-h-[90vh] py-12 gap-8">
        <h1 className="text-3xl">
          Welcome, <span className="text-special">{student.surname}</span>
        </h1>
        <div className="flex flex-col gap-4 justify-center items-center">
          <h2 className="text-3xl">Executive Candidates</h2>
          {sortedExecutivePositions.map((pos, index) => (
            <div key={`exec-${index}`} className="flex flex-col w-full gap-6">
              <div
                className="relative p-4 bg-gray-500 rounded-xl w-full flex justify-center items-center gap-8 text-center cursor-pointer"
                onClick={() => handleToggle(`exec-${index}`)}
              >
                <h1 className="text-3xl">{pos.position}</h1>
                <div className="absolute right-0 mx-4 self-end">
                  <IoIosArrowDown className="text-3xl" />
                </div>
              </div>
              {isToggled === `exec-${index}` && (
                <CandidateForm
                  candidates={executiveCandidates.filter(
                    (c) => c.position === pos.position
                  )}
                  position={pos.position}
                  selectedCandidateId={votes[pos.position]}
                  onVote={handleVote}
                />
              )}
            </div>
          ))}

          <h2 className="text-3xl">Senate Head Candidates</h2>
          {senateHeadPositions.map((pos, index) => (
            <div key={`senate-${index}`} className="flex flex-col w-full gap-6">
              <div
                className="relative p-4 bg-gray-500 rounded-xl w-full flex justify-center items-center gap-8 text-center cursor-pointer"
                onClick={() => handleToggle(`senate-${index}`)}
              >
                <h1 className="text-3xl">{pos.position}</h1>
                <div className="absolute right-0 mx-4 self-end">
                  <IoIosArrowDown className="text-3xl" />
                </div>
              </div>
              {isToggled === `senate-${index}` && (
                <CandidateForm
                  candidates={senateHeadCandidates.filter(
                    (c) => c.position === pos.position
                  )}
                  position={pos.position}
                  selectedCandidateId={votes[pos.position]}
                  onVote={handleVote}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center py-10">
          <button
            disabled={!allPositionsVoted}
            onClick={handleOpenModal}
            className={`px-6 py-3 text-white rounded-lg ${
              allPositionsVoted
                ? "bg-gradient-to-b from-[var(--color-special)] to-[var(--color-accent)] font-bold cursor-pointer hover:scale-105 transition-all duration-300"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Submit Votes
          </button>

          {/* Confirmation Modal */}
          {showModal && (
            <Modal
              title="Are you sure?"
              description="You will not be able to change your votes after this!"
              confirmText="Yes, submit"
              cancelText="Cancel"
              onCancel={() => setShowModal(false)}
              onConfirm={handleConfirmSubmit}
              isLoading={isSubmitting}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VotingPage;
