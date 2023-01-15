import React, { useContext } from "react";
import { AppContext } from "../appStateAndFunctions";

const ChosenMark = () => {
  const { userMark } = useContext(AppContext);
  return <h1 className="chosen-mark">You Chose {userMark}!</h1>;
};

export default ChosenMark;
