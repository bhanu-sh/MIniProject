import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import AdminSignup from "./AdminSignup";
import Browse from "./Browse";
import Product from "./Product";
import About from "./About";
import Contact from "./Contact";
import NotFound from "./NotFound";
import UserAuth from "./UserAuth";
import AddProduct from "./AddProduct";
import MyProducts from "./MyProducts";
import Profile from "./Profile";
import MyOrders from "./MyOrders";
import UserAllOrders from "./UserAllOrders";
import ManageOrder from "./ManageOrder";
import AdminAuth from "./AdminAuth";
import ManageUser from "./ManageUser";
import AllProducts from "./AllProducts";
import Pricing from "./Pricing";
import UpdateUser from "./UpdateUser";
import AllOrders from "./AllOrders";
import SetPrice from "./SetPrice";
import Admin from "./Admin";
import Checkout from "./Checkout";
import { AnimatePresence } from "framer-motion";
import EditProduct from "./EditProduct";
import Messages from "./Messages";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        {/* Normal Routes */}
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<AdminSignup />} path="/adminsignup" />
        <Route element={<Browse />} path="/browse" />
        <Route element={<Product />} path="/product/:id" />
        <Route element={<About />} path="/about" />
        <Route element={<Contact />} path="/contact" />
        <Route element={<NotFound />} path="*" />
        {/* User Auth Routes */}
        <Route
          element={
            <UserAuth>
              <AddProduct />
            </UserAuth>
          }
          path="/add"
        />
        <Route
          element={
            <UserAuth>
              <MyProducts />
            </UserAuth>
          }
          path="/myproducts"
        />
        <Route
          element={
            <UserAuth>
              <EditProduct />
            </UserAuth>
          }
          path="/editproduct/:id"
        />
        <Route
          element={
            <UserAuth>
              <Profile />
            </UserAuth>
          }
          path="/profile"
        />
        <Route
          element={
            <UserAuth>
              <Checkout />
            </UserAuth>
          }
          path="/checkout/:id"
        />
        <Route
          element={
            <UserAuth>
              <MyOrders />
            </UserAuth>
          }
          path="/myorders/"
        />
        <Route
          element={
            <UserAuth>
              <UserAllOrders />
            </UserAuth>
          }
          path="/userorders/"
        />
        <Route
          element={
            <UserAuth>
              <ManageOrder />
            </UserAuth>
          }
          path="/manageorder/:id"
        />
        {/* Admin Auth Routes */}
        <Route
          element={
            <AdminAuth>
              <ManageUser />
            </AdminAuth>
          }
          path="/manageuser"
        />
        <Route
          element={
            <AdminAuth>
              <AllProducts />
            </AdminAuth>
          }
          path="/allproducts"
        />
        <Route
          element={
            <AdminAuth>
              <Admin />
            </AdminAuth>
          }
          path="/webadmin"
        />
        <Route
          element={
            <AdminAuth>
              <Pricing />
            </AdminAuth>
          }
          path="/pricing"
        />
        <Route
          element={
            <AdminAuth>
              <SetPrice />
            </AdminAuth>
          }
          path="/setprice/:id"
        />
        <Route
          element={
            <AdminAuth>
              <UpdateUser />
            </AdminAuth>
          }
          path="/updateuser/:id"
        />
        <Route
          element={
            <AdminAuth>
              <AllOrders />
            </AdminAuth>
          }
          path="/allorders"
        />
        <Route
          element={
            <AdminAuth>
              <Messages />
            </AdminAuth>
          }
          path="/messages"
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
