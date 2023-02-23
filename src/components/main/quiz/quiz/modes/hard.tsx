import React, { useEffect, useState } from "react";
import { QuizAgentTypes } from "../../../../../utils/types";
import { getAgents } from "../../../../../gets/get";
import { Link } from "react-router-dom";
import "./styles-modes.sass/styles.sass";

export const HardQuiz = () => {
  const [agent, setAgent] = useState<QuizAgentTypes>();
  const [agents, setAgents] = useState<QuizAgentTypes[]>([]);
  const [fase, setFase] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [pontuation, setPontuation] = useState<number>(0);
  const [randomQuestion, setRandomQuestion] = useState<number>(
    Math.floor(Math.random() * 3)
  );
  const [count, setCount] = useState<number>(28);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //LOADING.

  useEffect(() => {
    if (agent !== undefined) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [agent]);

  // CRONÔMETRO.

  function counter() {
    if (count !== 0) {
      setCount(count - 1);
    }
  }
  useEffect(() => {
    if (count !== 0) {
      setTimeout(counter, 1000);
    }
  }, [count]);

  //VERIFICAÇÃO SE PERDEU POR CONTA DO TEMPO.

  useEffect(() => {
    function loseForTime() {
      if (count === 0) {
        setFase(11);
      }
    }
    loseForTime();
  }, [count === 0]);

  //BUSCANDO UM AGENTE ALEATORIO.

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAgents();
      setAgents(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (agents !== undefined) {
      setRandomQuestion(Math.floor(Math.random() * 3));
      const randomAgent = Math.floor(Math.random() * 21);
      setAgent(agents[randomAgent]);
    }
  }, [fase, agents]);

  //FUNÇÕES DO ONCLICK E DO KEYPRESS.

  function handleClick() {
    if (
      agent !== undefined &&
      name.toLowerCase() === agent.displayName.toLowerCase()
    ) {
      setPontuation(pontuation + 1);
    } else {
      setPontuation(pontuation - 1);
    }
    setName("");
    setFase(fase + 1);
  }

  return (
    <section className="section">
      {isLoading === true && <h1>Carregando</h1>}
      {isLoading === false && (
        <>
          {fase !== 11 && (
            <div className="quiz">
              <span>Tempo: {count} </span>
              <h1 className="quiz-pontuation">Pontuação: {pontuation}/10 </h1>
              <div className="quiz-questions">
                {randomQuestion === 0 && (
                  <>
                    <h1>De quem são essas habilidades?</h1>
                    <ul>
                      {agent?.abilities.map((element, index) => {
                        return <li key={index}>{element.displayName}</li>;
                      })}
                    </ul>
                  </>
                )}
                {randomQuestion === 1 && (
                  <>
                    <h1>De quem é essa silhueta?</h1>
                    <img src={agent?.displayIcon} alt="icon"></img>
                  </>
                )}
                {randomQuestion === 2 && (
                  <>
                    <h1>De quem é essa voz?</h1>
                    <ul>
                      {agent?.voiceLine.mediaList.map((element, index) => {
                        return (
                          <li key={index}>
                            <audio autoPlay src={element.wave}></audio>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
              </div>
              <input
                className="quiz-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleClick();
                  }
                }}
              ></input>
              <button
                id="button"
                autoFocus
                className="quiz-button"
                onClick={() => handleClick()}
              >
                Próximo agente
              </button>
            </div>
          )}
          {fase === 11 && (
            <section className="final">
              <h1 className="final-text">Pontuação Total: {pontuation}/10</h1>
              <Link className="final-button" to={"/menu"}>
                Jogar Novamente!
              </Link>
            </section>
          )}
        </>
      )}
    </section>
  );
};

