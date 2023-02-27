import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { Header } from "./header"
import store from "../../components/store"
import "@testing-library/jest-dom";

const renderComponent = () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );
};

describe("Header",() => {
    it("should render a logo", () => {
      renderComponent();

      expect(screen.getByText("ValoQuiz")).toBeInTheDocument();
    });

    it('should be open the burguer', () => {
        renderComponent();

        const btn = screen.getByTestId('button')
        fireEvent.click(btn)

        expect(screen.getByText("Agentes")).toBeInTheDocument()
        expect(screen.getByText("Quiz")).toBeInTheDocument();
    })
})