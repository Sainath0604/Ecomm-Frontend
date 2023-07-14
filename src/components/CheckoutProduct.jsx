import { useDispatch, useSelector } from "react-redux";
import { removeFromBasket } from "../toolkit/Reducer";

function CheckoutProduct() {
  const basket = useSelector((state) => state.basket.items);
  const dispatch = useDispatch();

  function removeFromCart(id) {
    try {
      dispatch(removeFromBasket(id));
      console.log("removed");
    } catch (error) {
      console.log("failed to remove");
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-2 ">
        {basket.map((item) => (
          <div className="flex flex-col max-w-3xl" key={item.id}>
            <div className=" mt-5">
              <div className="bg-gray-100 border dark:border-[#241B35] border-[#b770ed]  p-2 flex items-center lg:gap-x-2 rounded-tr-[2.4em] rounded-bl-[2.4em] shadow-xl">
                <div className="h-44 w-64  ">
                  <img
                    className="w-full h-full lg:w-full lg:h-full object-contain drop-shadow-2xl rounded-md "
                    src={item.img_src}
                    alt="img"
                  />
                </div>
                <div className="flex flex-col  items-center justify-center w-96 p-2 gap-y-2 text-[#241B35]">
                  <div className=" ">
                    <div className=" ">
                      <span className="mr-2 font-medium">Name:</span>
                      <span className="font-semibold text-lg text-red-800">
                        {item.pName}
                      </span>
                    </div>
                    <div className=" ">
                      <span className="mr-2 font-medium">Price:</span>
                      <span className="font-semibold text-lg">
                        &#8377;<span>{item.price}</span>
                      </span>
                    </div>
                  </div>
                  <button
                    className="border mt-4 p-2 w-36 text-center  rounded-lg bg-[#241B35] text-gray-50"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove from cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CheckoutProduct;
