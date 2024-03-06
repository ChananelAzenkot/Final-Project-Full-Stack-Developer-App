import { useState } from "react";
import { useEffect } from "react";
import Login from "../user/Login";
import MyOperation from "./MyOperation";

export default function Cards() {

  const [userConnected, setUserConnected] = useState(false);

  useEffect(() => {
    fetch(
      `http://localhost:4000/users/login`,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUserConnected(data);
      });
  }, []);

  const handleUserStatus = () => {
    const token = localStorage.getItem("token");
    if (userConnected && token) {
      return <MyOperation />;
    } else {
      return <Login />;
    }
  };

  return (
    <>
      {handleUserStatus()}
    </>
  );
}
