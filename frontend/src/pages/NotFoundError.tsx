import { useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const NotFoundError = () => {
  const { isLogging } = useAppContext();
  const { pathname } = useLocation();
  if (pathname === "/add-hotel") {
    return isLogging ? (
      <span>Loading...</span>
    ) : (
      <span>you need to login in order to create hotels.</span>
    );
  }
  return <div>404 error</div>;
};

export default NotFoundError;
