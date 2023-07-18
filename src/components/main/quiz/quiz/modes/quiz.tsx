import React, { useEffect, useState, useRef } from "react";
import { QuizAgentTypes, addOrDecrementTimeType } from "../../../../../utils/types";
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
  const agentsExist = agents !== undefined
  const timeoutRef = useRef<any>(null)
  const isACorrectAnswer = agent !== undefined && name.toLowerCase() === agent.displayName.toLowerCase()
  const [count, setCount] = useState<number>(time.time);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [addOrDecrementTime, setAddOrDecrementTime] = useState<addOrDecrementTimeType>({
    add: 0,
    decrement: 0,
  });
  const timeout = count <= 0

  const fetchData = async () => {
    const response = await getAgents();
    setAgents(response.data);
  };

  function getRandowQuestionAndRandomAgent() {
    if (agentsExist) {
      setRandomQuestion(Math.floor(Math.random() * 3));
      const randomAgent = Math.floor(Math.random() * 21);
      setAgent(agents[randomAgent]);
    }
  }

  useEffect(() => {
    if (timeout) {
      setFase(11);
    }
    function startTimer() {
      timeoutRef.current = setTimeout(() => {
        if (count > 0) {
          setCount(count - 1);
          setAddOrDecrementTime({ add: 0, decrement: 0 });
        } else {
          clearTimeout(timeoutRef.current);
        }
      }, 1000);
    }

    startTimer();
    return () => clearTimeout(timeoutRef.current);
  }, [count]);

  useEffect(() => {
    fetchData()
    if (agentsExist && isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
    if(!isLoading){
      getRandowQuestionAndRandomAgent()
    }
  }, [fase]);

  function addPointsAndTime() {
    setPontuation(pontuation + 1)
    setCount(count + 2)
    setAddOrDecrementTime({ add: 1, decrement: 0 })
  }
  function removePointsAndTime() {
    setPontuation(pontuation - 1);
    setCount(count - 2)
    setAddOrDecrementTime({ add: 0, decrement: 1 });
  }
  function nextFase() {
    setName("")
    setFase(fase + 1)
  }

  function handleClick() {
    if (isACorrectAnswer) {
      addPointsAndTime()
    } else {
      removePointsAndTime()
    }
    nextFase()
  }

  return (
    <section className="section">
      {isLoading === true && <Loading />}
      {isLoading === false && (
        <>
          {fase !== 11 && (
            <div className="quiz" data-testid="container">
              <span data-testid="timer" className="quiz-counter">
                {count}{" "}
              </span>
              {addOrDecrementTime.add === 1 && <span className="quiz-add">+2</span>}
              {addOrDecrementTime.decrement === 1 && (
                <span className="quiz-decrement">-2</span>
              )}
              <div className="quiz-questions">
                {randomQuestion === 0 && (
                  <>
                    <h1 data-testid="text">De quem são essas habilidades?</h1>
                    <ul>
                      {agent?.abilities.map((element, index) => {
                        return <li key={index}>{element.displayName}</li>;
                      })}
                    </ul>
                  </>
                )}
                {randomQuestion === 1 && (
                  <>
                    <h1 data-testid="text">De quem é essa silhueta?</h1>
                    <img src={agent?.displayIcon} alt="icon"></img>
                  </>
                )}
                {randomQuestion === 2 && (
                  <>
                    <h1 data-testid="text">De quem é essa voz?</h1>
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
