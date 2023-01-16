import React, { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { AppContext } from "../appStateAndFunctions";

const Gameboard = () => {
  const {
    checkForWin,
    setGameStatus,
    placeMark,
    AI,
    openSquares,
    user,
    whoseTurn,
    checkForDraw,
  } = useContext(AppContext);
  const gameboardSquares = Array(9).fill(0);

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (checkForWin()) {
      setGameStatus("won");
    }
    if (checkForDraw()) {
      setGameStatus("draw");
    }
    if (whoseTurn === "AI") {
      let randomIndex = Math.floor(Math.random() * openSquares.length);
      setTimeout(() => {
        if (document.querySelector(".gameboard")) {
          document.getElementById(openSquares[randomIndex]).textContent =
            AI.mark;
        }
        placeMark(AI, openSquares[randomIndex] - 1);
      }, 2000);
    }
  }, [
    AI,
    checkForDraw,
    checkForWin,
    openSquares,
    placeMark,
    setGameStatus,
    whoseTurn,
  ]);

  const MakeMoveDOM = (e) => {
    if (!e.target.textContent && whoseTurn === "User") {
      document.getElementById(e.target.id).textContent = user.mark;
    }
    placeMark(user, e.target.id - 1);
  };

  return (
    <div className="gameboard">
      {gameboardSquares.map((i, index) => (
        <div
          className="gameboard-square"
          key={index}
          id={index + 1}
          onClick={(e) => MakeMoveDOM(e)}
        ></div>
      ))}
    </div>
  );
};

export default Gameboard;
