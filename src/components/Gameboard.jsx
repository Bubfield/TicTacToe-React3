import React, { useContext, useEffect } from "react";
import { AppContext } from "../appStateAndFunctions";

const Gameboard = () => {
  const {
    checkForWin,
    setGameStatus,
    placeMark,
    AIMark,
    openSquares,
    userMark,
    whoseTurn,
    checkForDraw,
    randomIndex,
    gameStatus,
    activeBoard,
  } = useContext(AppContext);
  const gameboardSquares = Array(9).fill(0);

  useEffect(() => {
    if (checkForWin()) {
      setGameStatus("won");
    }
    if (checkForDraw()) {
      setGameStatus("draw");
    }
    if (whoseTurn === "AI") {
      setTimeout(() => {
        if (document.querySelector(".gameboard")) {
          document.getElementById(openSquares[randomIndex]).textContent =
            AIMark;
        }
        placeMark(AIMark, openSquares[randomIndex] - 1);
      }, 2000);
    }
  }, [
    AIMark,
    checkForDraw,
    checkForWin,
    openSquares,
    placeMark,
    setGameStatus,
    whoseTurn,
    randomIndex,
    gameStatus,
    activeBoard,
  ]);

  const MakeMoveDOM = (e) => {
    if (!e.target.textContent && whoseTurn === "User") {
      document.getElementById(e.target.id).textContent = userMark;
      placeMark(userMark, e.target.id - 1);
    }
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
