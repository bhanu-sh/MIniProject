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
import Profile from "./components/Profile";
import MyProducts from "./components/MyProducts";
import EditProduct from "./components/EditProduct";
import { Toaster } from "react-hot-toast";
import AllProducts from "./components/AllProducts";
import Admin from "./components/Admin";

function App() {
  const userJSON = sessionStorage.user;
  const user = userJSON ? JSON.parse(userJSON) : null;
  const admin = process.env.REACT_APP_ADMIN;

  return (
    <div className="black">
      <Toaster position="bottom-center" reverseOrder={false} />
      <BrowserRouter>
        <AppProvider>
          <Navbar />

          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Signup />} path="/signup" />
            <Route element={<Browse />} path="/browse" />
            <Route element={<Browse />} path="/browse/:type" />
            <Route element={<MyProducts />} path="/myproducts" />
            <Route
              element={
                <UserAuth>
                  <AddProduct />{" "}
                </UserAuth>
              }
              path="/add"
            />
            {user && user._id === admin ? (
              <>
                {console.log("routed to admin")}
                <Route element={<ManageUser />} path="/manageuser" />
                <Route element={<AllProducts />} path="/allproducts" />
                <Route element={<Admin />} path="/webadmin" />
              </>
            ) : console.log("Not routing")}
            <Route element={<UpdateUser />} path="/updateuser/:id" />
            <Route element={<EditProduct />} path="/editproduct/:id" />
            <Route
              element={
                <UserAuth>
                  <Profile />
                </UserAuth>
              }
              path="/profile"
            />
            <Route element={<Product />} path="/product/:id" />
            <Route element={<NotFound />} path="*" />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
