//import { ReactComponent as LogoDark } from "../assets/images/logos/xtremelogo.svg";
import user1 from "../assets/images/users/logo-commerk.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
       <img
              src={user1}
              alt="profile"
              // className="rounded-circle"
              width="220"
              height="100"
            ></img>
      {/* <LogoDark /> */}
    </Link>
  );
};

export default Logo;
