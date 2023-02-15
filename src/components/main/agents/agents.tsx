import { useEffect, useState } from "react"
import { getAgents } from "../../../gets/get"
import { AgentType } from "./agents-type"
import '../styles/stylesAgents.sass'

export const Agents = () => {
    const[agents, setAgents] = useState<AgentType[]>([])
    console.log(agents)
    useEffect(()=> {
        const fetchData = async () => {
            const response = await getAgents()
            const responseMap = response.data.map((element: AgentType) => {
              if(element.isPlayableCharacter === true){
                return element
              }
              else{
                return {}
              }
            })
            setAgents(responseMap)
        } 
        fetchData()
    },[])

    return (
      <section className="agents">
        <h1 className="agents-title">AGENTES</h1>
        <ul className="agents-list">
          {agents.map((element, index) => {
            return (
              <>
                {element.isPlayableCharacter === true && 
                  <li key={index} className="agents-list-items">
                    <img
                      className="agents-list-items-img"
                      src={element.displayIcon}
                      alt="img-agent"
                    ></img>
                    <p className="agents-list-items-name">
                      {element.displayName}
                    </p>
                  </li>
                }
              </>
            );
          })}
        </ul>
      </section>
    );
}