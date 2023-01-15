import { createContext, useState } from "react";

export const useAppState = () => {
  const [openSquares, setOpenSquares] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [userName, setUserName] = useState("");
  const [userMark, setUserMark] = useState(null);
  const [AIMark, setAIMark] = useState(null);
  const [gameStatus, setGameStatus] = useState("new");
  const [whoseTurn, setWhoseTurn] = useState(null);
  const [whoWon, setWhoWon] = useState(null);
  const [activeBoard, setActiveBoard] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const whoGoesFirst = (mark) => {
    if (mark === "X") {
      setWhoseTurn("User");
    } else {
      setWhoseTurn("AI");
    }
  };

  let randomIndex = Math.floor(Math.random() * openSquares.length);

  const handleRestart = () => {
    setOpenSquares([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    setUserName("");
    setUserMark(null);
    setAIMark(null);
    setGameStatus("new");
    setWhoseTurn(null);
    setWhoWon(null);
    setActiveBoard(["", "", "", "", "", "", "", "", ""]);
  };

  const handleMarks = (mark) => {
    setUserMark(mark);
    setAIMark(mark === "X" ? "O" : "X");
    whoGoesFirst(mark);
  };

  const placeMark = (whichPlayer, whichSquare) => {
    if (openSquares.indexOf(whichSquare + 1) !== -1) {
      let updatedBoard = [...activeBoard];
      updatedBoard[whichSquare] = whichPlayer;
      setActiveBoard(updatedBoard);
      setOpenSquares((squares) =>
        squares.filter((squareID) => squareID !== whichSquare + 1)
      );
      triggerNextTurn();
    } else {
      return;
    }
  };

  const triggerNextTurn = () => {
    if (whoseTurn === "User") {
      setWhoseTurn("AI");
    } else {
      setWhoseTurn("User");
    }
  };

  const setWinner = (mark) => {
    if (mark === userMark) {
      setWhoWon(userName);
    } else {
      setWhoWon("The Computer");
    }
  };

  const checkRow = (num1, num2, num3) => {
    let arr = [...activeBoard];
    if (arr[num1] && arr[num2] && arr[num3]) {
      if (arr[num1] === arr[num2] && arr[num1] === arr[num3]) {
        setWinner(arr[num1]);
        return true;
      }
    }
  };

  const checkHorizontalStreaks = () => {
    return checkRow(0, 1, 2) || checkRow(3, 4, 5) || checkRow(6, 7, 8);
  };

  const checkVerticalStreaks = () => {
    return checkRow(0, 3, 6) || checkRow(1, 4, 7) || checkRow(2, 5, 8);
  };

  const checkDiagonalStreaks = () => {
    return checkRow(0, 4, 8) || checkRow(2, 4, 6);
  };

  const checkForWin = () => {
    return (
      checkHorizontalStreaks() ||
      checkVerticalStreaks() ||
      checkDiagonalStreaks()
    );
  };

  const checkForDraw = () => {
    return !checkForWin() && !openSquares.length;
  };

  return {
    userName,
    setUserName,
    userMark,
    setUserMark,
    AIMark,
    setAIMark,
    gameStatus,
    setGameStatus,
    whoseTurn,
    setWhoseTurn,
    whoWon,
    setWhoWon,
    handleMarks,
    placeMark,
    activeBoard,
    checkForWin,
    openSquares,
    setOpenSquares,
    checkForDraw,
    handleRestart,
    whoGoesFirst,
    randomIndex,
  };
};

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const AppState = useAppState();
  return <AppContext.Provider value={AppState}>{children}</AppContext.Provider>;
};
