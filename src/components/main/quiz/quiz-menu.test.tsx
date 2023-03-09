import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../store";
import "@testing-library/jest-dom";
import { QuizMenu } from "./quiz-menu";

const setModeSpy = jest.fn();

const renderComponent = () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <QuizMenu setModeSpy={setModeSpy} />
      </BrowserRouter>
    </Provider>
  );
};

describe("Quiz menu test", () => {
  it("should be render the modes", () => {
    renderComponent();

    expect(screen.getByText("Fácil")).toBeInTheDocument();
    expect(screen.getByText("Médio")).toBeInTheDocument();
    expect(screen.getByText("Difícil")).toBeInTheDocument();
  });

  it("should change the variable to easy", () => {
    renderComponent();

    const buttonEasy = screen.getByText("Fácil");
    fireEvent.click(buttonEasy);

    expect(setModeSpy).toHaveBeenCalledWith("easy");
  });

  it("should modify the variable for medium", () => {
    renderComponent();

    const buttonMedium = screen.getByText("Médio");
    fireEvent.click(buttonMedium);

    expect(setModeSpy).toHaveBeenCalledWith("medium");
  });

  it("should change the variable to hard", () => {
    renderComponent();

    const buttonHard = screen.getByText("Difícil");
    fireEvent.click(buttonHard);

    expect(setModeSpy).toHaveBeenCalledWith("hard");
  });

  it("should modify the page after clicking a mode", () => {
    renderComponent();

    const buttonHard = screen.getByText("Difícil");
    fireEvent.click(buttonHard);
    const buttonStart = screen.getByText("Iniciar");

    expect(buttonStart).toHaveAttribute("href", "/quiz/start");
  });
});
