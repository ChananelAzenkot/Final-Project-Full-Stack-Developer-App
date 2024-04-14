import { useContext } from "react";
import { useEffect } from "react";
import Login from "../user/Login";
import MyOperation from "./MyOperation";
import { jwtDecode } from "jwt-decode";
import { Routes, Route } from 'react-router-dom';
import OperationTeams from "./OperationTeams";
import UserManagement from "../admin/UserManagement";
import { GeneralContext } from "../App";
import { RoleTypes } from "../components/RoleTypes.jsx";
import ProtectedRoute from "../user/ProtectedRoute";

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

  console.log(RoleTypes);

return (
  <>
    {user ? (
      <Routes>
        <Route
          path="/operationTeams"
          element={
            <ProtectedRoute permission={[RoleTypes.IsBusiness]}>
              <OperationTeams />
            </ProtectedRoute>
          }
        />
        <Route
          path="/centralizedOperation"
          element={
            <ProtectedRoute permission={[RoleTypes.isAdmin]}>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dailyOperation"
          element={
            <ProtectedRoute permission={[RoleTypes.user]}>
              <MyOperation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            user.IsBusiness ? <OperationTeams /> :
            user.isAdmin ? <UserManagement /> :
            <MyOperation />
          }
        />
      </Routes>
    ) : (
      <Login />
    )}
  </>
);
}
