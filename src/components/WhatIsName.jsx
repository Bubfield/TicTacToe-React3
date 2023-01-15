import React from "react";
import { useContext } from "react";
import { AppContext } from "../appStateAndFunctions";
import StartGame from "./StartGame";

const WhatIsName = () => {
  const { userName, setUserName, userMark } = useContext(AppContext);

  return (
    <div className="whatisname-div">
      <h1 className="whatisname-text">What is your name?</h1>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      {userName && userMark && <StartGame />}
    </div>
  );
};

export default WhatIsName;
