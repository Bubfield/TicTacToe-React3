import React from "react";
import { useContext } from "react";
import { AppContext } from "../appStateAndFunctions";

const XorO = () => {
  const { handleMarks } = useContext(AppContext);
  return (
    <div className="XorO-div">
      <h1 className="XorOChoose-h1">Choose:</h1>
      <h1 className="XorO-h1">
        <span className="X" onClick={() => handleMarks("X")}>
          X
        </span>{" "}
        or{" "}
        <span className="O" onClick={() => handleMarks("O")}>
          O
        </span>
      </h1>
    </div>
  );
};

export default XorO;
