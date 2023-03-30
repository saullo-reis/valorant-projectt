import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Quiz } from "./modes/quiz";

export const Modes = () => {
  const stock = useSelector((state: RootState) => state.stock.mode);
  return (
    <>
      {stock === "easy" && <Quiz data-testid="easy-quiz" time={17} />}
      {stock === "medium" && <Quiz data-testid="medium-quiz" time={12} />}
      {stock === "hard" && <Quiz data-testid="hard-quiz" time={7} />}
    </>
  );
};
