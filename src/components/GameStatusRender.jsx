import { useContext } from "react";
import { AppContext } from "../appStateAndFunctions";
import Gameboard from "./Gameboard";
import WhoWon from "./WhoWon";
import Draw from "./Draw";
import PreGame from "./PreGame";

function GameStatusRender() {
  const { gameStatus } = useContext(AppContext);
  if (gameStatus === "new") {
    return <PreGame />;
  } else if (gameStatus === "active") {
    return <Gameboard />;
  } else if (gameStatus === "won") {
    return <WhoWon />;
  } else {
    return <Draw />;
  }
}

export default GameStatusRender;
