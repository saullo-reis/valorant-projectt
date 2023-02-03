import { render, screen } from "@testing-library/react"
import { Header } from "./header"
import '@testing-library/jest-dom'

describe('Header', () => {
    it('testando renderização da logo', () => {
        render(<Header/>)

        expect(screen.getByText('ValoComp')).toBeInTheDocument();
    })
    it('testando renderização do botão', () => {
        render(<Header/>)

        expect(screen.getByRole('button', {name: '0/5'})).toBeInTheDocument()
    })
})