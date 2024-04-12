import { useContext } from "react";
import { GeneralContext } from "../App";

export const useGeneralContext = () => {
  const { user, setUser, setLoader, userRoleType, setUserRoleType } = useContext(GeneralContext);
  return { user, setUser, setLoader, userRoleType, setUserRoleType };
};
export const RoleTypes = {
  none: 0,
  user: 1,
  IsBusiness: 2,
  isAdmin: 3,
};

export const checkPermissions = (permissions, userRoleType) => {
  return permissions.includes(userRoleType);
};

export const pages = [
  { route: "/login", title: "כניסה", permissions: [RoleTypes.none] },
  { route: "/SignUp", title: "הירשם", permissions: [RoleTypes.none] },
  {
    route: "/dailyOperation",
    title: "תפעול יומי",
    permissions: [RoleTypes.user],
  },
  {
    route: "/incrementalOperation",
    title: "תפעול מצטבר",
    permissions: [RoleTypes.user],
  },
  {
    route: "/dailySalesOperation",
    title: "מכירות יומי",
    permissions: [RoleTypes.user],
  },
    {
    route: "/incrementalSalesOperation",
    title: "מכירות מצטבר",
    permissions: [RoleTypes.user],
  },
  {
    route: "/operationTeams",
    title: "תפעול צוותי",
    permissions: [RoleTypes.IsBusiness, RoleTypes.isAdmin],
  },
    {
    route: "/incrementalSalesOperationTeams",
    title: "מכירות הצוות",
    permissions: [RoleTypes.IsBusiness, RoleTypes.isAdmin],
  },
    {
    route: "/incrementalOperationTeams",
    title: "תפעול צוות מצטבר",
    permissions: [RoleTypes.IsBusiness],
  },
      {
    route: "/incrementalOperationTeamsPerAgent",
    title: "תפעול נציג מצטבר",
    permissions: [RoleTypes.IsBusiness],
  },
  { route: "/centralizedOperation", title: "תפעול מוקדי", permissions: [RoleTypes.isAdmin] },
    { route: "/about", title: "יעדים" },
];

export const useLogout = (setUser, setUserRoleType, setLoader, navigate, handleCloseUserMenu) => {
  const logout = () => {
    setLoader(true);
      setUser();
      setUserRoleType(RoleTypes.none);
      setLoader(false);
      localStorage.removeItem("token");
      navigate("./login");
    handleCloseUserMenu();
  };
  return logout;
};


