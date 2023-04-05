import { AgentDetails } from "./agents/agentDetails";
import { Agents } from "./agents/agents";
import { Route, Routes } from "react-router-dom";
import { Main } from "./main";
import { QuizMenu } from "./quiz/quiz-menu";
import { Modes } from "./quiz/quiz/quiz-modes";


export const Pages = () => {

  function setModeSpy() {
    return 'easy'
  }

  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/agentes" element={<Agents />}></Route>
      <Route path="/agente/:id" element={<AgentDetails />}></Route>
      <Route path="/menu" element={<QuizMenu setModeSpy={setModeSpy}/>}></Route>
      <Route path="/quiz/start" element={<Modes/>}></Route>
    </Routes>
  );
};
