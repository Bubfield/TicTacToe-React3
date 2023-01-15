import React, { useContext } from "react";
import { AppContext } from "../appStateAndFunctions";

const WhoWon = () => {
  const { whoWon } = useContext(AppContext);
  return <h1>{whoWon} Won!</h1>;
};

export default WhoWon;
