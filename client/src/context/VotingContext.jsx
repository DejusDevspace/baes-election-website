import React, { createContext, useState, useEffect, useContext } from "react";
import votingService from "../services/votingService";
import { AuthContext } from "./AuthContext";

export const VotingContext = createContext();

export const VotingProvider = ({ children }) => {
  const { student } = useContext(AuthContext);
  const [candidates, setCandidates] = useState([]);
  const [positions, setPositions] = useState([]);
  const [userVotes, setUserVotes] = useState({});
  const [hasVoted, setHasVoted] = useState(false);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch election data when student changes
  useEffect(() => {
    const fetchElectionData = async () => {
      if (!student) {
        setCandidates(null);
        return;
      }

      try {
        if (student) {
          // Load candidates and positions
          const candidatesData = await votingService.getAllCandidates();
          setCandidates(candidatesData);

          const positionsData = await votingService.getAllPositions();
          setPositions(positionsData);

          // Check if user has already voted
          const { votingStatus } = await votingService.hasVoted(student.id);
          setHasVoted(votingStatus);
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

  useEffect(() => {
    let interval;

    const startResultsPolling = () => {
      fetchResults();
      interval = setInterval(fetchResults, 10000);
    };

    if (student) {
      startResultsPolling();
    }

    return () => clearInterval(interval);
  }, [student]);

  // Cast a vote
  const castVote = async (voteData) => {
    try {
      setLoading(true);
      setError(null);

      if (!student) {
        throw new Error("You must be logged in to vote");
      }

      // Submit vote to server
      const vote = await votingService.castVote({
        voteData,
        studentId: student.id,
      });

      // Update local state to reflect the vote
      // setUserVotes((prev) => ({
      //   ...prev,
      //   [voteData.position]: voteData.id,
      // }));

      return vote;
    } catch (err) {
      setError(err.message || "Failed to cast vote");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch election results
  const fetchResults = async () => {
    try {
      setLoading(true);
      setError(null);

      const { resultsData } = await votingService.getResults();
      setResults(resultsData);

      return resultsData;
    } catch (err) {
      setError(err.message || "Failed to fetch results");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <VotingContext.Provider
      value={{
        candidates,
        positions,
        results,
        loading,
        error,
        castVote,
        fetchResults,
        hasVoted,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};

export const useVoting = () => useContext(VotingContext);
