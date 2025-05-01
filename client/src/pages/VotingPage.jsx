import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useVoting } from "../context/VotingContext";
import { IoIosArrowDown } from "react-icons/io";
import CandidateForm from "../components/common/CandidateForm";
import Modal from "../components/common/Modal";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const VotingPage = () => {
  const { student } = useContext(AuthContext);
  const { candidates, positions, castVote, hasVoted } = useVoting();
  const [votes, setVotes] = useState({});
  const [isToggled, setIsToggled] = useState(null);
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

  const sortedExecutivePositions = executivePositions.sort((a, b) => {
    const aPriority = positionPriority.indexOf(a.position);
    const bPriority = positionPriority.indexOf(b.position);
    if (aPriority === -1) return 1;
    if (bPriority === -1) return -1;
    return aPriority - bPriority;
  });

  const handleToggle = (id) => {
    setIsToggled((prev) => (prev === id ? null : id));
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
      await castVote(votes);
      toast.success("Votes submitted successfully!");
      navigate("/response-recorded");
    } catch (error) {
      toast.error("Error submitting votes. Please try again.");
    } finally {
      setIsSubmitting(false);
      setShowModal(false);
    }
  };

  const allPositions = [...sortedExecutivePositions, ...senateHeadPositions];
  const allPositionsVoted = allPositions.every((pos) => votes[pos.position]);
  const progress = Object.keys(votes).length;

  return (
    <div className="container mx-auto">
      <div className="flex flex-col py-12 gap-8 p-2 xl:p-4">
        <h1 className="text-3xl">
          Welcome, <span className="font-semibold">{student.surname}</span>
        </h1>

        <div className="text-center text-xl">
          Progress: <span className="text-accent">{progress} </span>/{" "}
          {allPositions.length} positions voted
        </div>

        <div className="flex flex-col gap-4 justify-center items-center">
          {/* <h2 className="text-3xl font-bold">Executive Candidates</h2> */}

          {sortedExecutivePositions.map((pos, index) => {
            const toggleId = `exec-${index}`;
            return (
              <div key={toggleId} className="flex flex-col w-full gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl 
                  shadow-xl p-6 w-full text-center cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                  onClick={() => handleToggle(toggleId)}
                >
                  <h1 className="text-2xl font-semibold tracking-wide">
                    {pos.position}
                  </h1>
                  <div
                    className={`absolute right-4 top-4 transition-transform duration-300 ${
                      isToggled === toggleId ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <IoIosArrowDown className="text-2xl" />
                  </div>
                </motion.div>
                <AnimatePresence>
                  {isToggled === toggleId && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <CandidateForm
                        candidates={executiveCandidates.filter(
                          (c) => c.position === pos.position
                        )}
                        position={pos.position}
                        selectedCandidateId={votes[pos.position]}
                        onVote={handleVote}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* <h2 className="text-3xl font-bold">Senate Head Candidates</h2> */}
          {senateHeadPositions.map((pos, index) => {
            const toggleId = `senate-${index}`;
            return (
              <div key={toggleId} className="flex flex-col w-full gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl p-6 w-full text-center cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                  onClick={() => handleToggle(toggleId)}
                >
                  <h1 className="text-2xl font-semibold tracking-wide">
                    {pos.position}
                  </h1>
                  <div
                    className={`absolute right-4 top-4 transition-transform duration-300 ${
                      isToggled === toggleId ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <IoIosArrowDown className="text-2xl" />
                  </div>
                </motion.div>
                <AnimatePresence>
                  {isToggled === toggleId && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <CandidateForm
                        candidates={senateHeadCandidates.filter(
                          (c) => c.position === pos.position
                        )}
                        position={pos.position}
                        selectedCandidateId={votes[pos.position]}
                        onVote={handleVote}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center py-10">
          <button
            disabled={!allPositionsVoted}
            onClick={handleOpenModal}
            className={`px-6 py-3 text-white rounded-lg font-bold transition-all duration-300 ${
              allPositionsVoted
                ? "bg-gradient-to-b from-[var(--color-special)] to-[var(--color-accent)] hover:scale-105 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Submit Votes
          </button>

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
