import React from 'react'
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../store";
import "@testing-library/jest-dom";
import { QuizMenu } from "./quiz-menu";
import { addMode } from "../../store/store";

const renderComponent = () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <QuizMenu/>
      </BrowserRouter>
    </Provider>
  );
};

describe('Quiz menu test',() => {
    it("should be render the modes",() => {
        renderComponent();

        expect(screen.getByText("Iniciar")).toBeInTheDocument();
        expect(screen.getByText("Fácil")).toBeInTheDocument();
        expect(screen.getByText("Médio")).toBeInTheDocument();
        expect(screen.getByText("Difícil")).toBeInTheDocument();
    })

    test('should dispatch addMode action with "easy" when easy mode is selected', () => {
      renderComponent()

      const easyButton = screen.getByText("Fácil");

    });

})