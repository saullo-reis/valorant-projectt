import { AgentDetails } from "./agents/agentDetails";
import { Agents } from "./agents/agents";
import { Route, Routes } from "react-router-dom";
import { Main } from "./main";
import { Footer } from "../footer/footer";

export const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/agentes" element={<Agents />}></Route>
      <Route path="/agente/:id" element={<AgentDetails />}></Route>
    </Routes>
  );
};
