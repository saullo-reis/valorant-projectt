import { useSelector } from "react-redux"
import { RootState } from "../../../store"
import { Quiz } from "./modes/quiz"

export const Modes = () => {
    const stock = useSelector((state: RootState) => state.stock)

    return (
      <>
        {stock.mode === "easy" && <Quiz time={15}/>}
        {stock.mode === "medium" && <Quiz time={10}/>}
        {stock.mode === "hard" && <Quiz time={7}/>}
      </>
    );
}