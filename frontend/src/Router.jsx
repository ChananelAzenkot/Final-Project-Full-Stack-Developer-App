import { Route, Routes } from "react-router-dom";
import Login from "./user/Login";
import SignUp from "./user/SignUp";
import Account from "./user/Account";
import OperationTeams from "./OperationPages/OperationTeams.jsx";
import UserManagement from "./admin/UserManagement.jsx";
import About from "./pages/About.jsx";
import MyOperation from "./OperationPages/MyOperation.jsx";
import IncrementalOperation from "./OperationPages/IncrementalOperation.jsx";
import CheckUser from "./OperationPages/CheckUser.jsx";
import SalesOperationDaily from "./OperationPages/SalesOperationDaily.jsx";
import SalesOperationIncremental from "./OperationPages/SalesOperationIncremental.jsx";
import SalesIncrementalTeams from "./OperationPages/SalesIncrementalTeams.jsx";
import IncrementalOperationTeams from "./OperationPages/IncrementalOperationTeams.jsx";
import IncrementalOperationTeamPerAgent from "./OperationPages/IncrementalOperationTeamPerAgent.jsx";
import { RoleTypes } from "./components/RoleTypes.jsx";
import ProtectedRoute from "./user/ProtectedRoute.jsx";

export default function Router(theme) {
  return (
    <Routes>
      <Route path="/" element={<CheckUser theme={theme} />} />
      <Route path="/about" element={<About theme={theme} />} />
      <Route path="/dailyOperation" element={
        <ProtectedRoute permission={[RoleTypes.user]}>
            <MyOperation theme={theme} />
        </ProtectedRoute>
        } />
      <Route
        path="/incrementalOperation"
        element={
            <ProtectedRoute permission={[RoleTypes.user]}>
            <IncrementalOperation theme={theme} />
            </ProtectedRoute>
        }
        />
      <Route
        path="/dailySalesOperation"
        element={
            <ProtectedRoute permission={[RoleTypes.user]}>
            <SalesOperationDaily theme={theme} />
            </ProtectedRoute>
        }
        />
      <Route
        path="/incrementalSalesOperation"
        element={
            <ProtectedRoute permission={[RoleTypes.user]}>
            <SalesOperationIncremental theme={theme} />
            </ProtectedRoute>
        }
        />
      <Route
        path="/incrementalSalesOperationTeams"
        element={
          <ProtectedRoute permission={[RoleTypes.IsBusiness]}>
            <SalesIncrementalTeams theme={theme} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/incrementalOperationTeams"
        element={
          <ProtectedRoute permission={[RoleTypes.IsBusiness]}>
            <IncrementalOperationTeams theme={theme} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/incrementalOperationTeamsPerAgent"
        element={
            <ProtectedRoute permission={[RoleTypes.IsBusiness]}>
            <IncrementalOperationTeamPerAgent theme={theme} />
            </ProtectedRoute>
        }
        />
      <Route
        path="/operationTeams"
        element={
            <ProtectedRoute permission={[RoleTypes.IsBusiness]}>
            <OperationTeams theme={theme} />
            </ProtectedRoute>
        }
      />
      <Route
        path="/centralizedOperation"
        element={
            <ProtectedRoute permission={[RoleTypes.isAdmin]}>
            <UserManagement theme={theme} />
            </ProtectedRoute>
        }
      />
        <Route
            path="/userManagement"
            element={
                <ProtectedRoute permission={[RoleTypes.isAdmin]}>
                <UserManagement theme={theme} />
                </ProtectedRoute>
            }
        />
        <Route
            path="*"
            element={
                <ProtectedRoute permission={[RoleTypes.none]}>
                <Login theme={theme} />
                </ProtectedRoute>
            }
        />
      <Route path="/login" element={<Login theme={theme} />} />
      <Route path="/SignUp" element={<SignUp theme={theme} />} />
      <Route path="/account" element={<Account theme={theme} />} />
    </Routes>
  );
}
