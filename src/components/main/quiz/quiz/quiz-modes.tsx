import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Quiz } from "./modes/quiz";

export const Modes = () => {
  const stock = useSelector((state: RootState) => state.stock.mode);
  console.log(stock);
  return (
    <>
      {stock === "easy" && <Quiz data-testid="easy-quiz" time={15} />}
      {stock === "medium" && <Quiz data-testid="medium-quiz" time={10} />}
      {stock === "hard" && <Quiz data-testid="hard-quiz" time={7} />}
    </>
  );
};
