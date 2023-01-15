import React, { useContext } from "react";
import Note from "./Note";
import WhatIsName from "./WhatIsName";
import XorO from "./XorO";
import ChosenMark from "./ChosenMark";
import { AppContext } from "../appStateAndFunctions";

const PreGame = () => {
  const { userMark } = useContext(AppContext);
  return (
    <>
      <Note />
      <WhatIsName />
      {!userMark ? <XorO /> : <ChosenMark />}
    </>
  );
};

export default PreGame;
