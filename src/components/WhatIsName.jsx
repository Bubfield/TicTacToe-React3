import React from "react";
import { useContext } from "react";
import { AppContext } from "../appStateAndFunctions";
import StartGame from "./StartGame";

const WhatIsName = () => {
  const { userName, setUserName, user } = useContext(AppContext);

  return (
    <div className="whatisname-div">
      <h1 className="whatisname-text">What is your name?</h1>
      <label htmlFor="name">Name:</label>{" "}
      <input
        type="text"
        name="name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      {userName && user.mark && <StartGame />}
    </div>
  );
};

export default WhatIsName;
