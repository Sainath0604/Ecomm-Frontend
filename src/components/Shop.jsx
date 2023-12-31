import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getServerUrl } from "../utility/getServerUrl";
import "../CSS/component.css";

function Shop() {
  const navigate = useNavigate();

  const [productInfo, setProductInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  const serverUrl = getServerUrl();
  const viewProductUrl = new URL("/getProductInfo", serverUrl);

  useEffect(() => {
    fetchProductInfo();
  }, []);

  const fetchProductInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch(viewProductUrl);
      const data = await response.json();
      setProductInfo(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <nav>
        <Navbar />
      </nav>

      <main className="dark:bg-[#D9CFFC]	bg-[#121212] flex-grow">
        {loading ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center flex-col gap-4">
            <div>
              <h1 className="text-white dark:text-gray-900 font-semibold text-lg">
                Please wait as the backend is deployed on a free service hosted
                on render.com. It may take some time to load. Thank you for your
                patience.
              </h1>
            </div>
            <div className="flex justify-center">
              <Oval
                height={80}
                width={80}
                color="#4070cf"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#4070cf"
                strokeWidth={4}
                strokeWidthSecondary={4}
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-center lg:p-10 ">
            <div className="grid grid-cols-1 mb-4 md:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-14 ">
              {productInfo.map((product) => (
                <div
                  key={product._id}
                  className="card my-4 relative p-3 bg-gray-100 rounded-md shadow-lg shadow-cyan-500/50 w-80 h-[450px] transition ease-in-out hover:-translate-y-1 hover:scale-100"
                >
                  <img
                    className="w-full h-4/5 object-contain drop-shadow-2xl rounded-md"
                    src={product.image.data}
                    alt={product.pName}
                  />
                  <div className="card-content py-3 text-center relative z-10">
                    <h3 className="text-xl text-black font-bold mb-2 ">
                      {product.pName}
                    </h3>

                    <p className="text-slate-950 text-lg mb-4">
                      <span className="font-semibold">Price:</span>{" "}
                      <span className="font-bold">
                        &#8377;<span>{product.Price}</span>
                      </span>
                    </p>
                    <button
                      className="card-btn hidden absolute top-[-100%] left-1/2 transform translate-x-[-50%] translate-y-[-50%] py-2 px-4 text-white bg-[#a385db] dark:bg-[#CB80FF] rounded-md"
                      onClick={() =>
                        navigate("/productDetails", {
                          state: {
                            id: product._id,
                            pName: product.pName,
                            image: product.image.data,
                            price: product.Price,
                            pDescription: product.pDescription,
                          },
                        })
                      }
                    >
                      View Product
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Shop;
