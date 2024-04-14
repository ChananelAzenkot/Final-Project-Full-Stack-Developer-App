import { useContext } from "react";
import { useEffect } from "react";
import Login from "../user/Login";
import MyOperation from "./MyOperation";
import { jwtDecode } from "jwt-decode";
import { Routes, Route } from 'react-router-dom';
import OperationTeams from "./OperationTeams";
import UserManagement from "../admin/UserManagement";
import { GeneralContext } from "../App";

export default function CheckUser() {
  const { user, setUser } = useContext(GeneralContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
       const user = jwtDecode(token);
       if(user) {
          setUser(user);
       }
    }
  }, []);

  return (
    <>
      {user ? (
        <Routes>
          {user.userRoleType === "IsBusiness" && <Route path="/operationTeams" component={OperationTeams} />}
          {user.userRoleType === "isAdmin" && <Route path="/centralizedOperation" component={UserManagement} />}
          {user.userRoleType === "user" && <Route path="/dailyOperation" component={MyOperation} />}
          <Route/>
        </Routes>
      ) : (
        <Login />
      )}
    </>
  );
}
