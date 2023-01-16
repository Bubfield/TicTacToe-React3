import React, { useContext } from "react";
import { AppContext } from "../appStateAndFunctions";

const ChosenMark = () => {
  const { user } = useContext(AppContext);
  return <h1 className="chosen-mark">You Chose {user.mark}!</h1>;
};

export default ChosenMark;
