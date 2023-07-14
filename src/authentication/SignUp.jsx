import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getServerUrl } from "../utility/getServerUrl";

function SignUp() {
  const navigate = useNavigate();

  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const serverUrl = getServerUrl();
  const registerUrl = new URL("/register", serverUrl);

  function registerUser(e) {
    e.preventDefault();
    console.log(fName, lName, email, password, userType);
    const payload = {
      fName,
      lName,
      email,
      password,
      userType,
    };
    console.log("This is payload", payload);
    fetch(registerUrl, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          console.log("User aleready exists");
        } else {
          alert("User Registered, Now you can proceed with login");
          console.log(data, "User Registered");
          if (data.status == "ok") {
            navigate("/signIn");
          }
        }
      });
  }

  function UserOrAdmin() {
    setUserType("user");
  }

  useEffect(() => {
    console.log(userType);
  }, [userType]);

  return (
    <div className="dark:bg-[#D9CFFC]	bg-[#121212] min-h-screen">
      <Navbar />
      <div className="flex justify-center mt-10 h-80 p-5">
        <form onSubmit={registerUser} className="w-full max-w-sm">
          <div className="h-10  flex flex-row justify-between lg:mb-5">
            <h1
              className="text-2xl font-bold text-[#D9CFFC] dark:text-[#241B35]"
              value={userType}
            >
              User Sign Up
            </h1>
            <Link to="/adminSignUp">
              <button className="bg-[#a385db] dark:bg-[#241B35] dark:hover:bg-[#523588] hover:bg-[#594383] text-gray-50 text-sm p-2 rounded-lg ">
                Admin Sign Up
              </button>
            </Link>
          </div>
          <div className="mb-4">
            <label className="block text-[#D9CFFC] dark:text-[#241B35] text-sm font-bold mb-2">
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#21193e] dark:text-[#241B35] leading-tight focus:outline-none focus:shadow-outline"
              id="fName"
              type="name"
              placeholder="Enter your First Name"
              value={fName}
              onChange={(e) => setFname(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#D9CFFC] dark:text-[#241B35] text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#21193e] dark:text-[#241B35] leading-tight focus:outline-none focus:shadow-outline"
              id="lName"
              type="name"
              placeholder="Enter your Last Name"
              value={lName}
              onChange={(e) => setLname(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#D9CFFC] dark:text-[#241B35] text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#21193e] dark:text-[#241B35] leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-[#D9CFFC] dark:text-[#241B35] text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#21193e] dark:text-[#241B35] leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={UserOrAdmin}
              className="bg-[#a385db] dark:bg-[#241B35] dark:hover:bg-[#523588] hover:bg-[#594383] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
            <div className="mt-10 text-[#D9CFFC] dark:text-[#241B35]">
              Already have account?
              <Link
                to="/SignIn"
                className="text-blue-500 hover:text-blue-700 ml-2 "
              >
                Log In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
