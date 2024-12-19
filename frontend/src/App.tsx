import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, NotFoundError, Register } from "./pages";
import Layout from "./layouts/Layout";

function App() {
  return (
    <BrowserRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
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
          path="*"
          element={
            <Layout>
              <NotFoundError />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
