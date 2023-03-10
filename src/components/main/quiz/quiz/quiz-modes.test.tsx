import React from "react";
import { Modes } from "./quiz-modes";
import { Provider } from "react-redux";
import store from "../../../store";
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";

const renderComponent = () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Modes />
      </BrowserRouter>
    </Provider>
  );
};

const mockSelector = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: () => mockSelector,
}));

describe("Modes", () => {
  it("should render the easy quiz", async () => {
    mockSelector.mockReturnValue("easy");
    renderComponent();

    await waitFor(
      () => {
        const easy = screen.getByTestId("easy-quiz");
        expect(easy).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
