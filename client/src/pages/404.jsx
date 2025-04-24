import React from "react";
import { Link } from "react-router-dom";
import { Ghost } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-8 my-12">
      <div className="text-center max-w-xl">
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
        >
          <div className="text-white text-9xl font-bold flex justify-center">
            <span className="text-special">4</span>
            <Ghost className="w-20 h-20 text-special animate-bounce" />
            <span className="text-special">4</span>
          </div>
          <h1 className="text-secondary text-4xl mt-6 font-semibold">
            Oops! Page Not Found
          </h1>
          <p className="text-secondary/70 mt-4">
            The page you’re looking for does not exist!
          </p>
          <Link
            to="/"
            className="inline-block mt-8 px-6 py-3 text-white font-bold rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            Go Back Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
