import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAgent } from "../../../gets/get";
import { AgentTypes } from "../../../utils/types";
import "../styles/stylesAgentDetails.sass";
import { Loading } from "../../loading/roll/loading";

export const AgentDetails = () => {
  const [agentData, setAgentData] = useState<AgentTypes>();
  const { id } = useParams();
  const [showRoleDescription, setShowRoleDescription] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (agentData !== undefined) {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [agentData]);

  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAgent(
        id !== undefined ? id : 'f94c3b30-42be-e959-889c-5aa313dba261'
      );
      response.data.abilities.splice(4, 1);
      setAgentData(response.data);
    };
    fetchData();
  }, []);

  function handleClickDescriptionRole() {
    if (showRoleDescription === false) {
      setShowRoleDescription(true);
    } else {
      setShowRoleDescription(false);
    }
  }

  return (
    <section className="agent">
      {isLoading === true && <Loading />}
      {isLoading === false && (
        <>
          <div className="agent-infos">
            <div className="agent-infos-card">
              <img
                className="agent-infos-card-image"
                alt={`Foto do campeão`}
                src={agentData?.fullPortrait}
              ></img>
              <div className="agent-infos-card-role">
                <img
                  onClick={() => {
                    handleClickDescriptionRole();
                  }}
                  data-testid="image"
                  className="agent-infos-card-role-image"
                  alt={`Imagem da função`}
                  src={agentData?.role.displayIcon}
                ></img>
                {showRoleDescription === true && (
                  <p className="agent-infos-card-role-description">
                    {agentData?.role.description}
                  </p>
                )}
              </div>

              <h2 className="agent-infos-card-name" data-testid="name">
                {agentData?.displayName}
              </h2>
            </div>
          </div>
          <ul className="agent-abilities">
            {agentData?.abilities.map((element, index) => {
              return (
                <li data-testid={`skill${index}`} key={index} className="agent-abilities-item">
                  <img
                    className="agent-abilities-item-image"
                    alt="Imagem da habilidade"
                    src={element.displayIcon}
                  ></img>
                  <p className="agent-abilities-item-text">
                    {element.displayName}
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
