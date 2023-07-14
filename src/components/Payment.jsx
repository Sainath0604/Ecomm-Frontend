import Navbar from "./Navbar";
import CheckoutProduct from "./CheckoutProduct";
import { useSelector } from "react-redux";
import { getBasketTotal } from "../toolkit/Reducer";
import Footer from "./Footer";
function Payment() {
  const basket = useSelector((state) => state.basket.items);
  const total = getBasketTotal(basket);

  return (
    <div className="flex flex-col min-h-screen ">
      <nav>
        <Navbar />
      </nav>
      <main className="dark:bg-[#D9CFFC]	bg-[#121212] text-[#D9CFFC] dark:text-[#241B35] flex-grow">
        <div className="p-5  pb-5">
          <div className="h-full p-2">
            <div className=" flex flex-col gap-8 lg:gap-y-4">
              <div className="lg:h-44 flex flex-col lg:items-center lg:flex-row lg:gap-x-8">
                <div className="h-8 lg:h-28 lg:w-60 text-xl font-bold mb-2">
                  Enter your addrress:
                </div>
                <div className="max-w-3xl w-full">
                  <textarea
                    className="border-2 bg-[#d6d6d6] p-2 placeholder-[#000] dark:bg-[#fff] resize-none border-gray-300 rounded-md w-full "
                    placeholder="Enter your addrress"
                    rows={5}
                  />
                </div>
              </div>
              {basket.length != 0 ? (
                <div className="flex flex-col p-2">
                  <div className="h-6 lg:w-60 text-xl font-bold">
                    Review items:
                  </div>
                  <div className="lg:w-4/5">
                    <CheckoutProduct />
                  </div>
                </div>
              ) : (
                <div></div>
              )}

              <div>
                <div className="flex flex-col lg:items-center lg:flex-row lg:gap-x-8 p-2">
                  <div className="h-8 lg:w-60 lg:h-36 text-xl font-bold mb-2">
                    Payment method:
                  </div>
                  <div className="h-36 lg:h-40 lg:w-80 border border-gray-500 rounded-lg bg-gray-100 flex flex-col p-2 lg:p-5 lg:mt-4">
                    <div className="flex flex-row items-center justify-center h-12 font-medium text-xl text-[#241B35]">
                      <span>Order total: &nbsp;</span>

                      <span className="font-bold text-[#bb5dfe]">
                        &#8377; {total}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-x-4 mt-5">
                      <button className="border bg-[#932add] text-gray-50 px-4 py-1 rounded-md lg:h-10">
                        Online
                      </button>
                      <button className="border bg-[#932add] text-gray-50 px-4 py-1 rounded-md lg:h-10">
                        Cash On Delivery
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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

export default Payment;
