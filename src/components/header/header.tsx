import { IoIosPeople } from "react-icons/io";
import "./styles/styles.sass";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Header = () => {
  const [menu, setMenu] = useState<string>("none");

  const handleClick = () => {
    if (menu === "none") {
      setMenu("flex");
    } else {
      setMenu("none");
    }
  };

  console.log(menu);
  return (
    <section className="header">
      <Link to={"/"} className="header-logo">
        ValoQuiz
      </Link>
      <div>
        <button
          className="header-button"
          onClick={() => {
            handleClick();
          }}
        >
          <GiHamburgerMenu />
        </button>
        <div
          data-testid="button"
          className="header-menu"
          style={{ display: menu }}
        >
          <nav>
            <Link to={"/agentes"}>Agentes</Link>
            <Link to={"/menu"}>Quiz</Link>
          </nav>
        </div>
      </div>
    </section>
  );
};
