import { Link } from "react-router-dom";
import style from "./Header.module.scss";

const Header = ({ goback }) => {
  return (
    <div className={style.header}>
      {goback && <Link to={-1}>Retour</Link>}
      <h1>Cantina</h1>
    </div>
  );
};

export default Header;
