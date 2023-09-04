import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import PropTypes from "prop-types";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";
import Footer from "./Footer";
import { getServerUrl } from "../utility/getServerUrl";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { getBasketTotal } from "../toolkit/Reducer";

function Checkout() {
  const basket = useSelector((state) => state.basket.items);
  // const total = getBasketTotal(basket);
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const [userData, setUserData] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [admin, setAdmin] = useState(false);

  const serverUrl = getServerUrl();
  const userDataUrl = new URL("/userData", serverUrl);

  useEffect(() => {
    fetch(userDataUrl, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "User data");
        if (data.data.userType === "admin") {
          setAdmin(true);
        }
        setUserData(data.data);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen dark:bg-[#D9CFFC]	bg-[#121212]  ">
      <nav>
        <Navbar />
      </nav>
      <main className="flex-grow">
        <div className="flex flex-col  lg:flex-row lg:mx-5 lg:mt-5 mb-8 px-5 md:px-20 lg:px-10 pt-10 lg:pt-5 pb-10 lg:pb-5 gap-y-8 lg:gap-x-12">
          <div className="p-5 w-full lg:w-[70%] ">
            <div className="">
              <div className=" text-[#D9CFFC] dark:text-[#241B35]">
                <div className="font-bold text-2xl ">Hello,</div>
                {isLoggedIn == "true" ? (
                  <div className="flex flex-col ml-5 ">
                    <div>
                      <span className="mr-2 font-medium text-xl ">Name:</span>
                      <span className="font-semibold text-2xl">
                        {userData.fName}
                      </span>
                    </div>
                    <div>
                      <span className="mr-2  font-medium text-xl">Email:</span>
                      <span className="font-semibold text-2xl">
                        {userData.email}
                      </span>
                    </div>
                  </div>
                ) : (
                  <h1 className="ml-5 font-semibold text-2xl">Guest</h1>
                )}

                {basket.length === 0 ? (
                  <div className="flex flex-col gap-8">
                    <span className="font-bold text-2xl mt-5">
                      You can browse through the shop and add products to your
                      cart.
                    </span>
                    <span className="flex justify-center">
                      <Link to="/shop">
                        <button className="border p-2 w-36 md:w-36 border-emerald-800 rounded-xl bg-gray-50  dark:bg-[#121212] hover:bg-gray-200  dark:hover:bg-[#282626] text-[#121212] dark:text-gray-50 shadow-emerald-800 shadow-md">
                          Go to Shop
                        </button>
                      </Link>
                    </span>
                  </div>
                ) : (
                  <div className="font-bold text-2xl mt-5">
                    Your shopping cart is here
                  </div>
                )}
              </div>
            </div>
            <div>
              <CheckoutProduct />
            </div>
          </div>
          <div className=" gap-y-5 w-full lg:w-1/4">
            <div className="flex flex-col p-5">
              <Subtotal />
            </div>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

Checkout.propTypes = {
  fName: PropTypes.string,
  email: PropTypes.string,
};
Checkout.defaultProps = {
  fName: "Guest",
  email: "",
};

export default Checkout;
