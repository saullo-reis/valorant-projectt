import { useEffect, useState } from "react";
import { getAgents } from "../../../gets/get";
import { AgentsType } from "../../../utils/types";
import "../styles/stylesAgents.sass";
import { Link } from "react-router-dom";
import { Loading } from "../../loading/roll/loading";

export const Agents = () => {
  const [agents, setAgents] = useState<AgentsType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (agents !== undefined) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [agents]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAgents();
      const responseMap = response.data.map((element: AgentsType) => {
        if (element.isPlayableCharacter === true) {
          return element;
        } else {
          return {};
        }
      });
      setAgents(responseMap);
    };
    fetchData();
  }, []);

  return (
    <section className="agents">
      {isLoading === true && <Loading />}
      {isLoading === false && (
        <>
          <h1 className="agents-title">AGENTES</h1>
          <ul className="agents-list">
            {agents.map((element, index) => {
              return (
                <>
                  {element.isPlayableCharacter === true && (
                    <li key={index} className="agents-list-items">
                      <Link to={`/agente/${element.uuid}`}>
                        <img
                          className="agents-list-items-img"
                          src={element.displayIcon}
                          alt="img-agent"
                        ></img>
                        <p className="agents-list-items-name">
                          {element.displayName}
                        </p>
                      </Link>
                    </li>
                  )}
                </>
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
};
