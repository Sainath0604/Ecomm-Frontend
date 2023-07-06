import { useEffect, useState } from "react";
import UserHome from "./UserHome";
import AdminPanel from "./AdminPanel";
import { getServerUrl } from "../utility/getServerUrl";

function UserDetails() {
  const [userData, setUserData] = useState({});
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

  return admin ? (
    <AdminPanel userData={userData} />
  ) : (
    userData && Object.keys(userData).length !== 0 && (
      <UserHome userData={userData} />
    )
  );
}

export default UserDetails;