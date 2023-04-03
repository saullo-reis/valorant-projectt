import { render,  waitFor, screen, fireEvent } from "@testing-library/react"
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
                    <Quiz time={20}/>
                </BrowserRouter>
            </Provider>
        )
    }

    it('should be render box', async () => {
        renderComponent();

        await waitFor(() => {
            expect(screen.getByTestId('container')).toBeInTheDocument()
        },{ timeout: 4000 })
    })

    it('should be render timer', async () => {
        renderComponent();

        await waitFor(
          () => {
            expect(screen.getByText(17)).toBeInTheDocument();
          },
          { timeout: 4000 }
        );
    })

    it('should be render texts', async () => {
        renderComponent();

        await waitFor(
          () => {
            const text = screen.getByTestId("text");
            expect(screen.getByText(text.innerHTML)).toBeInTheDocument();
          },
          { timeout: 4000 }
        );
    })

    it('should withdraw points', async () => {
        renderComponent()

        await waitFor(
          () => {
            expect(screen.getByText('17')).toBeInTheDocument()
          },
          { timeout: 4000 }
        );

        const timer = screen.getByTestId("timer");
        const btn = screen.getByText("Próximo agente");

        fireEvent.click(btn);


        expect(timer.innerHTML < "17").toBe(true);
    })
})