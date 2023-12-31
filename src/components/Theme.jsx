import { useState, useEffect } from "react";
import { MoonStarIcon, SunIcon } from "./Icons";

function Theme() {
  const [dark, setDark] = useState(false);
  const element = document.documentElement;

  useEffect(() => {
    const isDarkMode = localStorage.getItem("lightMode") === "true";
    setDark(isDarkMode);
    if (isDarkMode) {
      element.classList.add("dark");
    }
  }, []);

  const toggle = () => {
    const newDarkMode = !dark;
    localStorage.setItem("lightMode", newDarkMode);
    setDark(newDarkMode);
    if (newDarkMode) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  };

  return (
    <div>
      <div className="text-xl">
        {dark ? (
          <button
            className="border-2 p-2 rounded-full dark:bg-[#EED8FF] text-indigo-800"
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
