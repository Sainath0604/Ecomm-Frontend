import { useState } from "react";
import { MoonStarIcon, SunIcon } from "./Icons";

function Theme() {
  const [dark, setDark] = useState(false);
  const element = document.documentElement;

  const toggle = () => {
    element.classList.toggle("dark");
    setDark((prev) => !prev);
  };
  return (
    <div>
      <div className=" text-xl">
        {dark ? (
          <button
            className="border-2  p-2 rounded-full dark:bg-[#EED8FF] text-indigo-800"
            onClick={toggle}
          >
            <MoonStarIcon />
          </button>
        ) : (
          <button
            className="border-2 border-indigo-800 p-2 rounded-full bg-white text-indigo-800"
            onClick={toggle}
          >
            <SunIcon />
          </button>
        )}
      </div>
    </div>
  );
}

export default Theme;
