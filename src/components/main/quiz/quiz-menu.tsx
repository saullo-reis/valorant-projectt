import "./styles/quiz-menu-styles.sass";
import { useState } from "react";
import {useDispatch} from 'react-redux'
import { addMode } from "../../store/store";
import { Link } from "react-router-dom";

export const QuizMenu = ({setModeSpy}: any) => {
  const [mode, setMode] = useState("");
  const dispatch = useDispatch();

  function handleClick(modeButton: string) {
    setMode(modeButton);
    setModeSpy(modeButton);
  }

  function buttonBackGroundColor(modeButton: string) {
    if (modeButton === mode) {
      return "#ff4656";
    }
  }

  return (
    <section className="menu">
      {mode !== "" && (
        <Link
          to={"/quiz/start"}
          className="menu-button-menu"
          onClick={() => dispatch(addMode(mode))}
        >
          Iniciar
        </Link>
      )}

      <h1 className="menu-text">Selecione um modo</h1>
      <ul className="menu-container">
        <li
          className="menu-container-buttons"
          onClick={() => {
            handleClick("easy");
          }}
          style={{ backgroundColor: buttonBackGroundColor("easy") }}
        >
          Fácil
        </li>
        <li
          className="menu-container-buttons"
          onClick={() => {
            handleClick("medium");
          }}
          style={{ backgroundColor: buttonBackGroundColor("medium") }}
        >
          Médio
        </li>
        <li
          className="menu-container-buttons"
          onClick={() => {
            handleClick("hard");
          }}
          style={{ backgroundColor: buttonBackGroundColor("hard") }}
        >
          Difícil
        </li>
      </ul>
    </section>
  );
};
