import React, { useEffect, useState, useRef } from "react";
import { QuizAgentTypes } from "../../../../../utils/types";
import { getAgents } from "../../../../../gets/get";
import { Link } from "react-router-dom";
import "./styles-modes.sass/styles.sass";
import { Loading } from "../../../../loading/roll/loading";

export const Quiz = (time: { time: number }) => {
  const [agent, setAgent] = useState<QuizAgentTypes>();
  const [agents, setAgents] = useState<QuizAgentTypes[]>([]);
  const [fase, setFase] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [pontuation, setPontuation] = useState<number>(0);
  const [randomQuestion, setRandomQuestion] = useState<number>(
    Math.floor(Math.random() * 3)
  );
  const [count, setCount] = useState<number>(time.time);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [timeModify, setTimeModify] = useState<{
    add: number;
    decrement: number;
  }>({
    add: 0,
    decrement: 0,
  });

  //LOADING.
  useEffect(() => {
    if (agent !== undefined) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [agent]);

  // CRONÔMETRO.
  const timeoutRef = useRef<any>(null);
  useEffect(() => {
    if (count === 0) {
      setFase(11);
    }
    function startTimer() {
      timeoutRef.current = setTimeout(() => {
        if (count > 0) {
          setCount(count - 1);
          setTimeModify({ add: 0, decrement: 0 });
        } else {
          clearTimeout(timeoutRef.current);
        }
      }, 1000);
    }

    startTimer();
    return () => clearTimeout(timeoutRef.current);
  }, [count]);

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

  //FUNÇÃO DO ONCLICK

  function handleClick() {
    if (
      agent !== undefined &&
      name.toLowerCase() === agent.displayName.toLowerCase()
    ) {
      setPontuation(pontuation + 1);
      setCount(count + 5);
      setTimeModify({add: 1, decrement:0})
    } else {
      setPontuation(pontuation - 1);
      setCount(count - 2);
      setTimeModify({add: 0, decrement:1});
    }
    setName("");
    setFase(fase + 1);
  }

  return (
    <section className="section">
      {isLoading === true && <Loading />}
      {isLoading === false && (
        <>
          {fase !== 11 && (
            <div className="quiz">
              <span className="quiz-counter">{count} </span>
              {timeModify.add === 1 && <span className="quiz-add">+5</span>}
              {timeModify.decrement === 1 && <span className="quiz-decrement">-2</span>}
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
                            <audio autoPlay controls src={element.wave}></audio>
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
              <h1 className="quiz-pontuation">Pontuação: {pontuation}/10 </h1>
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
