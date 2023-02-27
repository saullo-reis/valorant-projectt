import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../components/store";
import "@testing-library/jest-dom";
import { Main } from "./main";

const renderComponent = () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
    </Provider>
  );
};

describe("Main-Page", () => {
  it("should be render", () => {
    renderComponent()

    expect(
      screen.getByText(
        "Aqui você encontra todos os campeões do valorant, e também temos um quiz para você práticar para saber tudo sobre os agentes."
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Agentes')).toBeInTheDocument()   
    expect(screen.getByText("Quiz")).toBeInTheDocument();  
  });

  it("renderiza Link para /agentes", () => {
    renderComponent()

    const linkForAgents = screen.getByText("Agentes");
    expect(linkForAgents).toBeInTheDocument();
    expect(linkForAgents).toHaveAttribute("href", "/agentes");

    const linkForQuiz = screen.getByText("Quiz");
    expect(linkForQuiz).toBeInTheDocument();
    expect(linkForQuiz).toHaveAttribute("href", "/menu");
  });
});
