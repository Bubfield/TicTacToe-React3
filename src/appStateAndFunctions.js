import { createContext, useState } from "react";

export const useAppState = () => {
  const [openSquares, setOpenSquares] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState({ player: "User", mark: null });
  const [AI, setAI] = useState({ player: "AI", mark: null });
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

  const handleRestart = () => {
    setOpenSquares([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    setUserName("");
    setUser({ player: "User", mark: null });
    setAI({ player: "AI", mark: null });
    setGameStatus("new");
    setWhoseTurn(null);
    setWhoWon(null);
    setActiveBoard(["", "", "", "", "", "", "", "", ""]);
  };

  const handleMarks = (mark) => {
    setUser({ ...user, mark: mark });
    setAI({ ...AI, mark: mark === "X" ? "O" : "X" });
    whoGoesFirst(mark);
  };

  const updateActiveBoard = (whichPlayer, whichSquare) => {
    let updatedBoard = [...activeBoard];
    updatedBoard[whichSquare] = whichPlayer;
    setActiveBoard(updatedBoard);
  };

  const updateOpenSquares = (whichSquare) => {
    setOpenSquares((squares) =>
      squares.filter((squareID) => squareID !== whichSquare + 1)
    );
  };

  const isAnOpenSquare = (whichSquare) => {
    return openSquares.indexOf(whichSquare + 1) !== -1;
  };

  const itIsPlayersTurn = (player) => {
    return player === whoseTurn;
  };

  const placeMark = (whichPlayer, whichSquare) => {
    const { player, mark } = whichPlayer;
    if (isAnOpenSquare(whichSquare) && itIsPlayersTurn(player)) {
      updateActiveBoard(mark, whichSquare);
      updateOpenSquares(whichSquare);
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
    if (mark === user.mark) {
      setWhoWon(userName);
    } else {
      setWhoWon("The Computer");
    }
  };

  const allSquaresAreOccupied = (one, two, three) => {
    return one && two && three;
  };

  const allSquaresAreEqual = (one, two, three) => {
    return one === two && one === three;
  };

  const checkRow = (num1, num2, num3) => {
    let one = activeBoard[num1];
    let two = activeBoard[num2];
    let three = activeBoard[num3];
    if (allSquaresAreOccupied(one, two, three)) {
      if (allSquaresAreEqual(one, two, three)) {
        setWinner(one);
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
    user,
    setUser,
    AI,
    setAI,
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
  };
};

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const AppState = useAppState();
  return <AppContext.Provider value={AppState}>{children}</AppContext.Provider>;
};
