import { useState } from "react";
import { useEffect } from "react";
import Login from "../user/Login";
import MyOperation from "./MyOperation";
import { jwtDecode } from "jwt-decode";

export default function Cards() {

  const [userConnected, setUserConnected] = useState(false);
  const [, setUser] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
       const user = jwtDecode(token);
      setUser(user);
      setUserConnected(true);
    }
  }, []);

  const handleUserStatus = () => {
    if (userConnected) {
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
