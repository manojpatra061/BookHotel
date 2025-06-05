import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AddHotel,
  Detail,
  EditHotel,
  Home,
  Login,
  MyHotels,
  NotFoundError,
  Register,
  Search,
} from "./pages";
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
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/detail/:hotelId"
          element={
            <Layout>
              <Detail />
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
        <Route
          path="/test"
          element={
            <Layout>
              <div>test</div>
            </Layout>
          }
        />
        {isLoggedIn && (
          <>
            <Route
              path="add-hotel"
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            />
            <Route
              path="my-hotels"
              element={
                <Layout>
                  <MyHotels />
                </Layout>
              }
            />
            <Route
              path="edit-hotel/:hotelId"
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
