import React, { createContext, useState, useEffect } from "react";
import authService from "../services/authService";

export const VotingContext = createContext();

export const VotingProvider = ({ children }) => {
  return <VotingContext.Provider value={{}}>{children}</VotingContext.Provider>;
};
