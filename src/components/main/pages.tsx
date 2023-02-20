import { AgentDetails } from "./agents/agentDetails";
import { Agents } from "./agents/agents";
import { Route, Routes } from "react-router-dom";
import { Main } from "./main";
import { Quiz } from "./quiz/quiz-menu";

export const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/agentes" element={<Agents />}></Route>
      <Route path="/agente/:id" element={<AgentDetails />}></Route>
      <Route path="/quiz" element={<Quiz/>}></Route>
    </Routes>
  );
};
