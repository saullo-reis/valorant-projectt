import { render,  waitFor, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { Quiz } from "./quiz"
import store from "../../../../store";
import "@testing-library/jest-dom"

describe('Quiz', () => {
    const renderComponent = () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Quiz time={10}/>
                </BrowserRouter>
            </Provider>
        )
    }
    it('should be render', async () => {
        renderComponent();

        await waitFor(() => {
            expect(screen.getByTestId('container')).toBeInTheDocument()
        },{ timeout: 4000 })
    })
})