import './styles/main.sass'
import { Link } from 'react-router-dom'

export const Main = () => {

    return (
      <section className="main">
        <h2 className="main-text">
          Aqui você encontra todos os campeões do valorant, e
          também temos um quiz para você práticar para saber tudo sobre
          os agentes.
        </h2>
        <nav className='main-buttons'>
          <Link to={"/agentes"}>Agentes</Link>
          <Link to={"/menu"}>Quiz</Link>
        </nav>
      </section>
    );
}