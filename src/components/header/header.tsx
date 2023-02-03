import { IoIosPeople } from "react-icons/io";
import "./styles/styles.sass";

export const Header = () => {
  return (
    <section className="header">
      <h1 className="header-logo">ValoComp</h1>
      <button className="header-team" name="buttonTeam">
        <p className="header-team-icon">
          <IoIosPeople />
        </p>
        <p className="header-team-number">0/5</p>
      </button>
    </section>
  );
};
