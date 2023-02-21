import { useSelector } from "react-redux"
import { RootState } from "../../../store"
import { EasyQuiz } from "./modes/easy"
import { HardQuiz } from "./modes/hard"
import { MediumQuiz } from "./modes/medium"

export const Quiz = () => {
    const stock = useSelector((state: RootState) => state.stock)

    console.log(stock.mode)
    return (
      <>
        {stock.mode === "easy" && <EasyQuiz />}
        {stock.mode === "medium" && <MediumQuiz />}
        {stock.mode === "hard" && <HardQuiz />}
      </>
    );
}