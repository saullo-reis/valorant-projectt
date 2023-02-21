import { AgentDetails } from "./agents/agentDetails";
import { Agents } from "./agents/agents";
import { Route, Routes } from "react-router-dom";
import { Main } from "./main";
import { QuizMenu } from "./quiz/quiz-menu";
import { Quiz } from "./quiz/quiz/quiz";

export const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/agentes" element={<Agents />}></Route>
      <Route path="/agente/:id" element={<AgentDetails />}></Route>
      <Route path="/menu" element={<QuizMenu/>}></Route>
      <Route path="/quiz/start" element={<Quiz/>}></Route>
    </Routes>
  );
};
