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
import Pricing from "./components/Pricing";
import SetPrice from "./components/SetPrice";
import AdminAuth from "./components/AdminAuth";
import Checkout from "./components/Checkout";
import MyOrders from "./components/MyOrders";
import AllOrders from "./components/AllOrders";

function App() {

  return (
    console.log(process.env.REACT_APP_ADMIN),
    <div className="black">
      <Toaster position="bottom-center" reverseOrder={false} />
      <BrowserRouter>
        <AppProvider>
          <Navbar />

          <Routes>
            {/* Normal Routes */}
            <Route element={<Home />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Signup />} path="/signup" />
            <Route element={<Browse />} path="/browse" />
            <Route element={<Product />} path="/product/:id" />
            <Route element={<NotFound />} path="*" />
            {/* User Auth Routes */}
            <Route element={<UserAuth><AddProduct /></UserAuth>} path="/add" />
            <Route element={<UserAuth><MyProducts /></UserAuth>} path="/myproducts" />
            <Route element={<UserAuth><EditProduct /></UserAuth>} path="/editproduct/:id" />
            <Route element={<UserAuth><Profile /></UserAuth>} path="/profile"/>
            <Route element={<UserAuth><Checkout /></UserAuth>} path="/checkout/:id" />
            <Route element={<UserAuth><MyOrders /></UserAuth>} path="/myorders/" />
            {/* Admin Auth Routes */}
            <Route element={<AdminAuth><ManageUser /></AdminAuth>} path="/manageuser" />
            <Route element={<AdminAuth><AllProducts /></AdminAuth>} path="/allproducts" />
            <Route element={<AdminAuth><Admin /></AdminAuth>} path="/webadmin" />
            <Route element={<AdminAuth><Pricing /></AdminAuth>} path="/pricing" />
            <Route element={<AdminAuth><SetPrice /></AdminAuth>} path="/setprice/:id" />
            <Route element={<AdminAuth><UpdateUser /></AdminAuth>} path="/updateuser/:id" />
            <Route element={<AdminAuth><AllOrders /></AdminAuth>} path="/allorders/" />
          </Routes>

        </AppProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
