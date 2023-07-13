import { useSelector } from "react-redux";
import { getBasketTotal } from "../toolkit/Reducer";
import { useNavigate } from "react-router-dom";

function Subtotal() {
  const basket = useSelector((state) => state.basket.items);
  const total = getBasketTotal(basket);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center border p-2 border-sky-300 bg-gray-100 rounded-lg shadow-lg gap-y-2">
      <div className="flex flex-col items-center justify-center h-32 w-full p-2">
        <div className="font-semibold text-2xl mb-2">
          Sub-total of {""}
          <span className="font-bold text-red-700 ">
            {basket.length === 0 ? <span>0</span> : basket.length}
          </span>{" "}
          items
        </div>
        <div>
          <span className="mr-2 font-semibold text-2xl">Sub-total:</span>
          <span className="font-bold text-2xl">
            &#8377;
            <span className="underline decoration-indigo-500">{total}</span>
          </span>
        </div>
      </div>
      <div className="text-center">
        <button
          className="border p-2 h-12 mb-2 w-3/4 border-emerald-800 rounded-xl bg-[#121212] hover:bg-[#282626] text-gray-50"
          onClick={() => navigate("/payment")}
        >
          Proceed to payment
        </button>
      </div>
    </div>
  );
}

export default Subtotal;
