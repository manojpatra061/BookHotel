import { Button, LinkButton } from "@/components";
import { apiTest } from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const Home = () => {
  const { showToast } = useAppContext();

  return (
    <>
      <div>Home</div>
      <button
        onClick={async () => {
          try {
            const data = await apiTest();
            console.log(data);
            showToast({ message: data.message, type: "SUCCESS" });
          } catch (error) {
            showToast({ message: "something went wrong", type: "ERROR" });
          }
        }}
        className="bg-blue-800 p-2 text-white font-bold hover:bg-blue-600"
      >
        click to test
      </button>
    </>
  );
};

export default Home;
