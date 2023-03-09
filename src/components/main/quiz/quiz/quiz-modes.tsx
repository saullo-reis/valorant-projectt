import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Quiz } from "./modes/quiz";

export const Modes = () => {
  const stock = useSelector((state: RootState) => state.stock);
  console.log(stock);
  return (
    <>
      {stock.mode === "easy" && <Quiz data-testid="easy-quiz" time={15} />}
      {stock.mode === "medium" && <Quiz data-testid="medium-quiz" time={10} />}
      {stock.mode === "hard" && <Quiz data-testid="hard-quiz" time={7} />}
    </>
  );
};
