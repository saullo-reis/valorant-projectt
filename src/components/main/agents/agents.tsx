import { useEffect, useState } from "react";
import { getAgents } from "../../../gets/get";
import { AgentsType } from "../../../utils/types";
import "../styles/stylesAgents.sass";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../loading/roll/loading";

export const Agents = () => {
  const [agents, setAgents] = useState<AgentsType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const checkingIfAgentsIsDifferentOfUndefined = agents !== undefined

  function checkingIfIsLoading(){
    if(checkingIfAgentsIsDifferentOfUndefined){
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }

  const fetchData = async () => {
    const response = await getAgents();
    const arrayOfAgents: any = []
    response.data.forEach((element: AgentsType) => {
      if (element.isPlayableCharacter) {
        arrayOfAgents.push(element)
      }

    });
    setAgents(arrayOfAgents);
  };

  useEffect(() => {
    checkingIfIsLoading()
    fetchData();
  }, [checkingIfAgentsIsDifferentOfUndefined]);

  return (
    <section className="agents">
      {isLoading === true && <Loading />}
      {isLoading === false && (
        <>
          <h1 className="agents-title">AGENTES</h1>
          <ul className="agents-list">
            {agents?.map((element, index) => {
              return (
                <li
                  key={index}
                  data-testid={element?.displayName}
                  className="agents-list-items"
                  onClick={() =>
                    navigate(
                      `/agente/${
                        element.uuid !== undefined
                          ? element.uuid
                          : "f94c3b30-42be-e959-889c-5aa313dba261"
                      }`
                    )
                  }
                >
                  <img
                    className="agents-list-items-img"
                    src={element?.displayIcon}
                    alt="img-agent"
                  ></img>
                  <p className="agents-list-items-name">
                    {element?.displayName}
                  </p>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
};
