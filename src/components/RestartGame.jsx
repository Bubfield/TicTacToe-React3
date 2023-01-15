import React, { useContext } from "react";
import { AppContext } from "../appStateAndFunctions";

const RestartGame = () => {
  const { handleRestart } = useContext(AppContext);
  return (
    <div className="restart-game-div">
      <button onClick={handleRestart}>Restart Game</button>
    </div>
  );
};

export default RestartGame;
