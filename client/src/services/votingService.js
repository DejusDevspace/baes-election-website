import api from "./api";

const votingService = {
  /**
   * Get all candidates for an election
   * @param {string} electionId - ID of the election
   * @returns {Promise<Array>} - List of candidates
   */
  async getAllCandidates(electionId) {
    const response = await api.get(`/candidates`);
    return response.data;
  },

  /**
   * Get positions for an election
   * @returns {Promise<Array>} - List of positions
   */
  async getPositions() {
    const response = await api.get(`/candidates/positions`);
    return response.data;
  },

  /**
   * Get a user's votes for an election
   * @param {string} studentId - ID of the student
   * @returns {Promise<Object>} - Map of position IDs to candidate IDs
   */
  async getUserVotes(studentId) {
    const response = await api.get(`api/student/my-votes/${studentId}`);

    // Transform array of votes to a map of positionId -> candidateId
    const votesMap = {};
    response.data.forEach((vote) => {
      votesMap[vote.positionId] = vote.candidateId;
    });

    return votesMap;
  },

  /**
   * Cast a vote
   * @param {Object} voteData - Vote data object
   * @param {string} voteData.electionId - ID of the election
   * @param {string} voteData.positionId - ID of the position
   * @param {string} voteData.candidateId - ID of the candidate
   * @param {string} voteData.voterId - ID of the voter
   * @returns {Promise<Object>} - Vote confirmation
   */
  async castVote(voteData) {
    const response = await api.post("/votes", voteData);
    return response.data;
  },

  /**
   * Get election results
   * @param {string} electionId - ID of the election
   * @returns {Promise<Object>} - Election results data
   */
  async getResults(electionId) {
    const response = await api.get(`/elections/${electionId}/results`);
    return response.data;
  },
};

export default votingService;
