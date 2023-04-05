import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../store";
import { AgentDetails } from "./agentDetails";
import '@testing-library/jest-dom'

describe('AgentDetails', () => {
    const renderComponent = () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <AgentDetails />
          </BrowserRouter>
        </Provider>
      );
    };

    it('should be rendering agent', async () => {
        renderComponent()

        await waitFor(() => {
            expect(screen.getByTestId("name")).toBeInTheDocument();
            // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
            expect(screen.getByTestId("image")).toBeInTheDocument();
        },{timeout: 2000})
    })

    it('should be rendering skills', async () => {
        renderComponent()

        await waitFor(() => {
            for(let i = 0; i !== 4; ++i){
                expect(screen.getByTestId(`skill${i}`)).toBeInTheDocument()
            }
        })
    })
})