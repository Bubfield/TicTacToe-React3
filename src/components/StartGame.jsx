import React, { useContext } from "react";
import { AppContext } from "../appStateAndFunctions";

const StartGame = () => {
  const { setGameStatus } = useContext(AppContext);

  return (
    <button
      type="button"
      className="username-input-btn"
      onClick={() => setGameStatus("active")}
    >
      Start Game
    </button>
  );
};

export default StartGame;
