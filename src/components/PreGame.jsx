import React, { useContext } from "react";
import Note from "./Note";
import WhatIsName from "./WhatIsName";
import XorO from "./XorO";
import ChosenMark from "./ChosenMark";
import { AppContext } from "../appStateAndFunctions";

const PreGame = () => {
  const { user } = useContext(AppContext);
  return (
    <>
      <Note />
      <WhatIsName />
      {!user.mark ? <XorO /> : <ChosenMark />}
    </>
  );
};

export default PreGame;
