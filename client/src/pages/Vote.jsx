import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CandidateCard from "../components/common/CandidateCard";

const Vote = () => {
  const { student } = useContext(AuthContext);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  // const fetchCandidates = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/vote");
  //     setCandidates(response.data);
  //   } catch (error) {
  //     console.error("Error fetching candidates:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchCandidates();
  // }, []);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col min-h-[90vh] py-12">
        <h1 className="text-3xl">
          Welcome,{" "}
          <span className="text-special">{student.student.surname}</span>
        </h1>
        <div className="flex flex-col gap-4 justify-center items-center">
          <h1 className="text-3xl">President</h1>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <h1 className="text-3xl">Vice President</h1>
        </div>
        <CandidateCard candidate={"candidateObject"} />
      </div>
    </div>
  );
};

export default Vote;
