import React from "react";
import { GeneralContext } from "../App";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  permission: PropTypes.arrayOf(PropTypes.number),
};

export default function ProtectedRoute({ children, permission }) {
  const navigate = useNavigate();
  const { userRoleType, user } = React.useContext(GeneralContext);
  const userRoleTypeNumber = Number(userRoleType);
  const userHadPermission = permission
    ? permission.includes(userRoleTypeNumber)
    : false;
  if (!userHadPermission) {
    return (
      <div
        className="titleOperationAndAgents"
        style={{ height: "200px", display: "grid" }}>
        {`שלום , ${user?.name?.first ? user.name.first : "אורח"} כנראה הגעת לפה  בטעות אפשר לנסות שוב :)`}
        <ul>
          {user?.IsBusiness && (
            <li onClick={() => navigate("/operationTeams")}>
              <IconButton id="btnCreateAndPress" style={{ color: "black" }}>
                לתפעול הצוות
              </IconButton>
            </li>
          )}
          {!user?.IsBusiness && !user?.isAdmin && user?.teamName && (
            <li onClick={() => navigate("/dailyOperation")}>
              <IconButton id="btnCreateAndPress" style={{ color: "black" }}>
                תפעול היומי שלי
              </IconButton>
            </li>
          )}
          {user?.isAdmin && (
            <li onClick={() => navigate("/centralizedOperation")}>
              <IconButton id="btnCreateAndPress" style={{ color: "black" }}>
                תפעול המוקד הכללי
              </IconButton>
            </li>
          )}
          {!user?.teamName && (
            <li onClick={() => navigate("/login")}>
              <IconButton id="btnCreateAndPress" style={{ color: "black" }}>
                להתחברות
              </IconButton>
            </li>
          )}
        </ul>
      </div>
    );
  } else {
    return children;
  }
}
