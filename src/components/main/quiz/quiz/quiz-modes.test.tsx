import React from "react";
import { Modes } from "./quiz-modes";
import { Provider } from "react-redux";
import store from "../../../store";
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'

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
  useSelector: () => mockSelector(),
}));

describe("Modes", () => {
  it("should render the easy quiz", async () => {
    mockSelector.mockReturnValue("easy");
    renderComponent();

    await waitFor(
      () => {
        const easy = screen.getByText("15");
        expect(easy).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it("should render the medium quiz", async () => {
    mockSelector.mockReturnValue("medium");
    renderComponent();

    await waitFor(
      () => {
        const medium = screen.getByText("10");
        expect(medium).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it("should render the hard quiz", async () => {
    mockSelector.mockReturnValue("hard");
    renderComponent();

    await waitFor(
      () => {
        const hard = screen.getByText("5");
        expect(hard).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
