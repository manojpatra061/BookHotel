import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddHotel, Home, Login, NotFoundError, Register } from "./pages";
import Layout from "./layouts/Layout";
import { useAppContext } from "./contexts/AppContext";

function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          // catch all route for 404
          path="*"
          element={
            <Layout>
              <NotFoundError />
            </Layout>
          }
        />
        {isLoggedIn && (
          <Route
            path="add-hotel"
            element={
              <Layout>
                <AddHotel />
              </Layout>
            }
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
