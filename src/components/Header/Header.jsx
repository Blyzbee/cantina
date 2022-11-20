import { Link } from "react-router-dom";
import style from "./Header.module.scss";
import arrowBack from "../../assets/icons/arrow-back.svg";
import Logo from "../../assets/icons/logo-cantina.png";

const Header = ({ goback }) => {
  return (
    <div className={style.header}>
      <img src={Logo} alt="logo la cantina" />
      {goback && (
        <div>
          <img src={arrowBack} />
          <Link to={"/"}>Retour vers les recettes</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
