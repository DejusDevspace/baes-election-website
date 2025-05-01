import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useVoting } from "../context/VotingContext";
import LivePoll from "../components/common/LivePoll";

const Home = () => {
  const { student } = useContext(AuthContext);
  const { results } = useVoting();

  const LandingContent = () => {
    return (
      <div className="container mx-auto overflow-hidden">
        <div className="flex min-h-[90vh] flex-col lg:flex-row gap-12 justify-center items-center py-12 px-4">
          <div className="flex flex-col gap-4 items-center text-center lg:items-start lg:text-left">
            <h1 className="text-6xl lg:text-8xl leading-none">
              BAES <br /> Executive Election
            </h1>
            <p>Choose your next senate representatives!</p>
            <button
              className="bg-gradient-to-b from-[var(--color-special)] to-[var(--color-accent)] 
        w-fit p-4 rounded-lg"
            >
              <a href="/login">Log In</a>
            </button>
          </div>
          <div className="w-full min-h-[550px] lg:w-[550px] lg:min-h-[650px] bg-accent">
            Images
          </div>
        </div>
      </div>
    );
  };

  return student ? <LivePoll /> : <LandingContent />;
};

export default Home;
