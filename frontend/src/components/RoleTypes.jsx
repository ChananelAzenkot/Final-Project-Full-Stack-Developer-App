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
    permissions: [RoleTypes.user, RoleTypes.IsBusiness, RoleTypes.isAdmin],
  },
    {
    route: "/incrementalOperation",
    title: "תפעול מצטבר",
    permissions: [RoleTypes.user, RoleTypes.IsBusiness, RoleTypes.isAdmin],
  },
  {
    route: "/operationTeams",
    title: "תפעול צוותי",
    permissions: [RoleTypes.IsBusiness, RoleTypes.isAdmin],
  },
  { route: "/centralizedOperation", title: "תפעול מוקדי", permissions: [RoleTypes.isAdmin] },
    { route: "/about", title: "יעדים" },
];

export const useLogout = (setUser, setUserRoleType, setLoader, navigate, handleCloseUserMenu) => {
  const logout = () => {
    setLoader(true);

    fetch(`http://localhost:4000/logout`, {
      credentials: "include",
    }).then(() => {
      setUser();
      setUserRoleType(RoleTypes.none);
      setLoader(false);
      localStorage.removeItem("token");
      navigate("./login");
    });

    handleCloseUserMenu();
  };

  return logout;
};

