import { useEffect, useState } from "react";
import { QuizAgentTypes } from "../../../../../utils/types";
import { getAgents } from "../../../../../gets/get";
import { Link } from "react-router-dom";
import "./styles-modes.sass/styles.sass";

export const HardQuiz = () => {
  const [agent, setAgent] = useState<QuizAgentTypes>();
  const [fase, setFase] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [pontuation, setPontuation] = useState<number>(0);
  const [randomQuestion, setRandomQuestion] = useState<number>(
    Math.floor(Math.random() * 3)
  );
  const [count, setCount] = useState<number>(5);

  function counter() {
    setCount(count - 1);
  }
  useEffect(() => {
    if (count !== 0) {
      setTimeout(counter, 1000);
    }
  }, [count]);

  useEffect(() => {
    function reset(){
      if(count === 0 ){
        setCount(5)
        setPontuation(pontuation - 10)
        setFase(fase + 1)
        setName("")
      }
    }
    reset()
  },[count === 0])

  useEffect(() => {
    setRandomQuestion(Math.floor(Math.random() * 3));
    const fetchData = async () => {
      const randomAgent = Math.floor(Math.random() * 21);
      const response = await getAgents();
      response.data.splice(7, 1);
      setAgent(response.data[randomAgent]);
    };
    fetchData();
  }, [fase]);

  function handleClick() {
    if (
      agent !== undefined &&
      name.toLowerCase() === agent.displayName.toLowerCase()
    ) {
      setPontuation(pontuation + 10);
    } else {
      setPontuation(pontuation - 10);
    }
    setName("");
    setFase(fase + 1)
  }

  return (
    <section className="section">
      {fase !== 11 && (
        <div className="quiz">
          <span>Tempo: {count} </span>
          <h1 className="quiz-pontuation">Pontuação: {pontuation} </h1>
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
                        <audio controls src={element.wave}></audio>
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
          ></input>
          {name !== "" && (
            <button className="quiz-button" onClick={() => handleClick()}>
              Próxima fase
            </button>
          )}
        </div>
      )}
      {fase === 11 && (
        <section className="final">
          <h1 className="final-text">Pontuação Total: {pontuation}</h1>
          <Link className="final-button" to={"/menu"}>
            Jogar Novamente!
          </Link>
        </section>
      )}
    </section>
  );
};
