import { useEffect, useState } from "react";
import { QuizAgentTypes } from "../../../../../utils/types";
import { getAgents } from "../../../../../gets/get";
import { Link } from "react-router-dom";
import "./styles-modes.sass/styles.sass";

export const MediumQuiz = () => {
  const [agent, setAgent] = useState<QuizAgentTypes>();
  const [fase, setFase] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [pontuation, setPontuation] = useState<number>(0);
  const [randomQuestion, setRandomQuestion] = useState<number>(
    Math.floor(Math.random() * 3)
  );

  const randomAgent = Math.floor(Math.random() * 21);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAgents();
      response.data.splice(7, 1);
      setAgent(response.data[randomAgent]);
    };
    fetchData();
  }, [fase]);

  console.log(agent);
  function handleClick() {
    setFase(fase + 1);
    if (agent !== undefined) {
      if (name.toLowerCase() === agent.displayName.toLowerCase()) {
        setPontuation(pontuation + 10);
      } else {
        setPontuation(pontuation - 10);
      }
    }
    setName("");
    setRandomQuestion(Math.floor(Math.random() * 3));
  }

  return (
    <section className="section">
      {fase !== 11 && (
        <div className="quiz">
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
          <Link className="final-button" to={"/quiz"}>
            Jogar Novamente!
          </Link>
        </section>
      )}
    </section>
  );
};
