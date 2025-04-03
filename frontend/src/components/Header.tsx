import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { LogoutButton } from "../components";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-800 py-6 px-10 md:px-40">
      <div className="container mx-auto flex justify-between">
        <span className="text-2xl font-bold text-white">
          <Link to={"/"}>BookHotel.com</Link>
        </span>
        <span className="flex gap-4">
          {isLoggedIn ? (
            <>
              <Link
                to="/my-hotels"
                className="text-blue-800 font-bold bg-white py-2 px-4 text-base hover:bg-gray-300"
              >
                my hotels
              </Link>
              <Link
                to="/add-hotel"
                className="text-blue-800 font-bold bg-white py-2 px-4 text-base hover:bg-gray-300"
              >
                add hotel
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                to={"/login"}
                className="text-blue-800 font-bold bg-white py-2 px-4 text-base hover:bg-gray-300"
              >
                login
              </Link>
              <Link
                to={"/register"}
                className="text-blue-800 font-bold bg-white py-2 px-4 text-base hover:bg-gray-300"
              >
                register
              </Link>
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
