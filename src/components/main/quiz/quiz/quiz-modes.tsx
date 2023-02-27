import { useSelector } from "react-redux"
import { RootState } from "../../../store"
import { Quiz } from "./modes/quiz"

export const Modes = () => {
    const stock = useSelector((state: RootState) => state.stock)

    console.log(stock.mode)
    return (
      <>
        {stock.mode === "easy" && <Quiz time={30}/>}
        {stock.mode === "medium" && <Quiz time={25}/>}
        {stock.mode === "hard" && <Quiz time={20}/>}
      </>
    );
}