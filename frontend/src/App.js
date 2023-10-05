import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Browse from "./components/Browse";
import UserAuth from "./components/UserAuth";
import ManageUser from "./components/ManageUser";
import UpdateUser from "./components/UpdateUser";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import { AppProvider } from "./AppContext";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppProvider>
          <Navbar />

          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Signup />} path="/signup" />
            <Route element={<Browse />} path="/browse" />
            <Route
              element={
                <UserAuth>
                  <AddProduct />{" "}
                </UserAuth>
              }
              path="/add"
            />
            <Route
              element={
                <UserAuth>
                  <ManageUser />
                </UserAuth>
              }
              path="/manageuser"
            />
            <Route element={<UpdateUser />} path="/updateuser/:id" />
            <Route element={<Product />} path="/product/:id" />
            <Route element={<NotFound />} path="*" />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
