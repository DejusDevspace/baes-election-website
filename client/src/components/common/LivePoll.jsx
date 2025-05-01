import React, { useContext, useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { AuthContext } from "../../context/AuthContext";
import { useVoting } from "../../context/VotingContext";

const LivePoll = () => {
  const { student } = useContext(AuthContext);
  const { results } = useVoting();
  const [selectedPosition, setSelectedPosition] = useState("");

  useEffect(() => {
    if (results && Object.keys(results).length > 0) {
      setSelectedPosition((prev) =>
        prev && results[prev] ? prev : Object.keys(results)[0]
      );
    }
  }, [results]);

  const handlePositionChange = (e) => {
    setSelectedPosition(e.target.value);
  };

  const chartData =
    selectedPosition && results[selectedPosition]
      ? selectedPosition === "Senate Head"
        ? results[selectedPosition]
            .filter(
              (candidate) =>
                candidate.level === student?.level &&
                candidate.department === student?.department
            )
            .map((candidate) => ({
              name: `${candidate.name}, ${
                candidate.department === "Mechatronics Engineering"
                  ? "MCT"
                  : "EEE"
              } (${candidate.level})`,
              votes: candidate.votes_count,
            }))
        : results[selectedPosition].map((candidate) => ({
            name: `${candidate.name}, ${
              candidate.department === "Mechatronics Engineering"
                ? "MCT"
                : "EEE"
            } (${candidate.level})`,
            votes: candidate.votes_count,
          }))
      : [];

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Live Poll Results</h2>

      {Object.keys(results).length === 0 ? (
        <p className="text-center">No results available yet...</p>
      ) : (
        <>
          <div className="mb-6 text-center">
            <label htmlFor="position" className="mr-2 font-medium">
              Select Position:
            </label>
            <select
              id="position"
              value={selectedPosition}
              onChange={handlePositionChange}
              className="border rounded px-3 py-2"
            >
              {Object.keys(results).map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <XAxis dataKey="level" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="votes" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default LivePoll;
