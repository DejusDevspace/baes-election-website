import React from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="flex flex-col gap-8 items-center justify-center p-4">
      <img
        src="/assets/thank-you.png"
        alt="thank-you"
        className="max-h-[50vh] w-full object-cover"
      />
      <Link
        to="/"
        className="inline-block mt-8 px-6 py-3 text-white font-bold rounded-xl bg-gradient-to-b from-[var(--color-special)] to-[var(--color-accent)] hover:scale-105 transition-transform duration-300 shadow-lg"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ThankYou;
