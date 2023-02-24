import { useEffect, useState } from "react";
import { QuizAgentTypes } from "../../../../../utils/types";
import { getAgents } from "../../../../../gets/get";
import { Link } from "react-router-dom";
import "./styles-modes.sass/styles.sass";

export const MediumQuiz = () => {
  const [agent, setAgent] = useState<QuizAgentTypes>();
  const [agents, setAgents] = useState<QuizAgentTypes[]>([]);
  const [fase, setFase] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [pontuation, setPontuation] = useState<number>(0);
  const [randomQuestion, setRandomQuestion] = useState<number>(
    Math.floor(Math.random() * 3)
  );
  const [count, setCount] = useState<number>(30);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //LOADING.

  useEffect(() => {
    if (agent !== undefined) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [agent]);

  // // CRONÔMETRO.

  function counter() {
    setCount(count - 1);
  }

  useEffect(() => {
    if (isLoading === false) {
      if (count !== 0) {
        setTimeout(counter, 1000);
      } else {
        setFase(11);
      }
    }
  }, [count, isLoading]);

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
              <span className="quiz-counter">{count} </span>
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
