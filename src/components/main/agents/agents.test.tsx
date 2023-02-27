import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../components/store";
import "@testing-library/jest-dom";
import { Agents } from "./agents";

const renderComponent = () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Agents />
      </BrowserRouter>
    </Provider>
  );
};

describe("Agent", () => {
  it("testando renderizacao deles", () => {
    renderComponent();

    expect(screen.getByText('Omen')).toBeInTheDocument()
  });
});
