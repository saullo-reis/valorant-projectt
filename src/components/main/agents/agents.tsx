import { useEffect, useState } from "react"
import { getAgents } from "../../getAgents/agents"
import { AgentType } from "./agents-type"
import './styles/styles.sass'

export const Agents = () => {
    const[agents, setAgents] = useState<AgentType[]>([])
    console.log(agents)
    useEffect(()=> {
        const fetchData = async () => {
            const response = await getAgents()
            setAgents(response.data)
        } 
        fetchData()
    },[])

    return (
      <section className="section-agents">
        <h1 className="title">AGENTES</h1>
        <ul className="agents">
          {agents.map((element, index) => {
            return (
              <li key={index} className="agents-box">
                <img
                  className="agents-box-img"
                  src={element.displayIcon}
                  alt="img-agent"
                ></img>
                <p className="agents-box-name">{element.displayName}</p>
              </li>
            );
          })}
        </ul>
      </section>
    );
}