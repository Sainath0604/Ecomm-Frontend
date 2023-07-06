import "./tailwind.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import UserDetails from "./components/UserDetails";
import UserHome from "./components/UserHome";
import AdminSignUp from "./components/AdminSignUp";
import AdminPanel from "./components/AdminPanel";
import ViewUser from "./components/ViewUser";
import EditUser from "./components/EditUser";
import ErrorPage from "./components/ErrorPage";
import UploadProduct from "./components/UploadProduct";
import ViewProduct from "./components/ViewProduct";
import Shop from "./components/Shop";
import ProductDetails from "./components/ProductDetails";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");

  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const userType = window.localStorage.getItem("userType");
    setUserType(userType);
  }, []);

  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/navbar" element={<Navbar />} />
            <Route
              path="/signIn"
              element={isLoggedIn == "true" ? <UserDetails /> : <SignIn />}
            />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/userDetails" element={<UserDetails />} />
            <Route path="/userHome" element={<UserHome />} />
            <Route path="/adminSignUp" element={<AdminSignUp />} />

            {userType === "admin" ? (
              <Route path="/adminPanel" element={<AdminPanel />} />
            ) : (
              <Route path="/adminPanel" element={<ErrorPage />} />
            )}

            {userType === "admin" ? (
              <Route path="/viewUser" element={<ViewUser />} />
            ) : (
              <Route path="/viewUser" element={<ErrorPage />} />
            )}

            {userType === "admin" ? (
              <Route path="/editUser" element={<EditUser />} />
            ) : (
              <Route path="/editUser" element={<ErrorPage />} />
            )}

            <Route path="/errorPage" element={<ErrorPage />} />
            <Route path="/uploadProduct" element={<UploadProduct />} />
            <Route path="/viewProduct" element={<ViewProduct />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/productDetails" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
