import "./styles/quiz-styles.sass";
import { useState } from "react";

export const Quiz = () => {
  const [mode, setMode] = useState("");

  function handleClick(modeButton: string) {
    switch (modeButton) {
      case "facil":
        setMode("facil");
        break;
      case "medio":
        setMode("medio");
        break;
      case "dificil":
        setMode("dificil");
        break;
    }
  }

  function buttonBackGroundColor(modeButton: string) {
    if (modeButton === mode) {
      return "#ff4656";
    }
  }

  console.log(mode);

  return (
    <section className="quiz">
      <button className="quiz-button">Iniciar</button>
      <h1 className="quiz-text">Selecione um modo</h1>
      <ul className="quiz-container">
        <li
          className="quiz-container-buttons"
          onClick={() => {
            handleClick("facil");
          }}
          style={{ backgroundColor: buttonBackGroundColor("facil") }}
        >
          Fácil
        </li>
        <li
          className="quiz-container-buttons"
          onClick={() => {
            handleClick("medio");
          }}
          style={{ backgroundColor: buttonBackGroundColor("medio") }}
        >
          Médio
        </li>
        <li
          className="quiz-container-buttons"
          onClick={() => {
            handleClick("dificil");
          }}
          style={{ backgroundColor: buttonBackGroundColor("dificil") }}
        >
          Difícil
        </li>
      </ul>
    </section>
  );
};
