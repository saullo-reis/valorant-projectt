import { Agents } from "./agents";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../store";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Agents", () => {
  const renderComponent = () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Agents />
        </BrowserRouter>
      </Provider>
    );
  };

  it("should be rendering title", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("AGENTES")).toBeInTheDocument();
    },{timeout:2000});
  });

  it("should be rendering the agents", async () => {
    renderComponent();
    const arrayAgents = [
      "Gekko",
      "Fade",
      "Breach",
      "Raze",
      "Chamber",
      "KAY/O",
      "Skye",
      "Cypher",
      "Sova",
      "Killjoy",
      "Harbor",
      "Viper",
      "Phoenix",
      "Astra",
      "Brimstone",
      "Neon",
      "Yoru",
      "Sage",
      "Reyna",
      "Omen",
      "Jett"
    ];

    await waitFor(
      () => {
        arrayAgents.map((element) => {
          expect(screen.getByText(element)).toBeInTheDocument();
        });
      },
      { timeout: 3000 }
    );
  });

  it("should call navigate with the correct path", async () => {
    renderComponent();

    await waitFor(
      () => {
        expect(screen.getByText("Gekko")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const btnTest = screen.getByTestId("Gekko");
    fireEvent.click(btnTest);

    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(
      "/agente/e370fa57-4757-3604-3648-499e1f642d3f"
    );
  });
});
