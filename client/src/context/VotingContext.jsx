import React, { createContext, useState, useEffect, useContext } from "react";
import votingService from "../services/votingService";
import { AuthContext } from "./AuthContext";

export const VotingContext = createContext();

export const VotingProvider = ({ children }) => {
  const { student } = useContext(AuthContext);
  const [candidates, setCandidates] = useState([]);
  const [positions, setPositions] = useState([]);
  const [senateCandidates, setSenateCandidates] = useState([]);
  const [userVotes, setUserVotes] = useState({});
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch active election when student changes
  useEffect(() => {
    const fetchElectionData = async () => {
      if (!student) {
        setCandidates(null);
        return;
      }

      try {
        if (student) {
          // Load candidates and positions for this election
          const candidatesData = await votingService.getAllCandidates();
          setCandidates(candidatesData);

          const positionsData = await votingService.getPositions();
          setPositions(positionsData);

          const studentData = {
            position: "Senate Head",
            level: student.level,
            department: student.department,
          };
          console.log("Student Data:", studentData);

          const senateCandidatesData =
            await votingService.getSenateCandidatesForStudent(studentData);
          setSenateCandidates(senateCandidatesData);

          // Check if user has already voted
          // const userVotesData = await votingService.getUserVotes(student.id);
          // setUserVotes(userVotesData);
        }
      } catch (err) {
        console.error("Error fetching election data:", err);
        setError(err.message || "Failed to load election data");
      } finally {
        setLoading(false);
      }
    };

    fetchElectionData();
  }, [student]);

  // Cast a vote
  const castVote = async (positionId, candidateId) => {
    try {
      setLoading(true);
      setError(null);

      if (!currentElection) {
        throw new Error("No active election");
      }

      if (!student) {
        throw new Error("You must be logged in to vote");
      }

      // Submit vote to server
      const vote = await votingService.castVote({
        positionId,
        candidateId,
        voterId: student.id,
      });

      // Update local state to reflect the vote
      setUserVotes((prev) => ({
        ...prev,
        [positionId]: candidateId,
      }));

      return vote;
    } catch (err) {
      setError(err.message || "Failed to cast vote");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch election results
  const fetchResults = async (electionId = null) => {
    try {
      setLoading(true);
      setError(null);

      const targetElectionId = electionId || currentElection?.id;

      if (!targetElectionId) {
        throw new Error("No election specified");
      }

      const resultsData = await votingService.getResults(targetElectionId);
      setResults(resultsData);
      return resultsData;
    } catch (err) {
      setError(err.message || "Failed to fetch results");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Check if user has voted for a specific position
  const hasVoted = (positionId) => {
    return Boolean(userVotes[positionId]);
  };

  // Check if user has completed voting for all positions
  const hasCompletedVoting = () => {
    if (!positions.length) return false;
    return positions.every((position) => hasVoted(position.id));
  };

  // Get candidate by ID
  const getCandidateById = (candidateId) => {
    return candidates.find((candidate) => candidate.id === candidateId) || null;
  };

  // Get candidates for a specific position
  const getCandidatesByPosition = (positionId) => {
    return candidates.filter(
      (candidate) => candidate.positionId === positionId
    );
  };

  return (
    <VotingContext.Provider
      value={{
        candidates,
        positions,
        userVotes,
        results,
        loading,
        error,
        castVote,
        fetchResults,
        hasVoted,
        hasCompletedVoting,
        getCandidateById,
        getCandidatesByPosition,
        senateCandidates,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};

export const useVoting = () => useContext(VotingContext);
