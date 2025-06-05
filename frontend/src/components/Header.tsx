import { Link } from "react-router-dom";
import NavMenu from "./NavMenu";

const Header = () => {
  return (
    <div className="bg-blue-800 py-6 px-10 md:px-40">
      <div className="container mx-auto flex justify-between">
        <span className="text-2xl font-bold text-white">
          <Link to={"/"}>BookHotel.com</Link>
        </span>
        <NavMenu />
      </div>
    </div>
  );
};

export default Header;
