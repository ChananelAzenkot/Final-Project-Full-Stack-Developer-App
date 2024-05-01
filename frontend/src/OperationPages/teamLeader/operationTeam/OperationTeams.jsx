import { useContext, useState } from "react";
import "../../../styles/operation.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import moment from "moment";
import OperatingAverageTeam from "./OperatingAverageTeam";
import EditOperation from "../../../Agent/operationProcess/editOperation/EditOperation";
import DeleteOperation from "../../../Agent/operationProcess/deleteOperation/DeleteOperation";
import { GeneralContext } from "../../../App";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: "15px",
    padding: "5px",
    margin: "5px",
    textAlign: "center",
    width: "100px",
    border: "1px solid white",
    borderRadius: "8px 8px 0 0",
    textShadow: "1px 1px 6px white",
    boxShadow: "1px 1px 3px 1px white",
  },
  [`&.${tableCellClasses.body}`]: {
    padding: "5px",
    margin: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    width: "100px",
    textAlign: "center",
    border: "1px solid black",
    boxShadow: "1px 1px 8px  1px black",
    textShadow: "1px 1px 6px black",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: "1px solid black",
    textAlign: "center",
    fontSize: "16px",
  },
}));

export default function OperationTeams() {
  const [operationsTeam, setOperationsTeam] = useState([]);
  const { snackbar } = useContext(GeneralContext);

  useEffect(() => {
    const token = localStorage.token;
    if (!token) {
      window.location.href = "/login";
    }
    fetch(`http://localhost:4000/api/operationTeam`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOperationsTeam(data);
        snackbar(
          data.message ? data.message : "הממוצע תפעול של החודש נטען בהצלחה !"
        );
      });
  }, []);

  return (
    <>
      {!operationsTeam.length ? (
        <div className="titleOperationAndAgents">
          <h3>{`אין תפעול ראשוני לצוות עדין`}</h3>
        </div>
      ) : (
        <>
          <div className="titleOperationAndAgents">
            <h3>{`התפעול של צוות ${
              operationsTeam[0]?.teamName
            } היום : ${moment().format("DD/MM/YY")}`}</h3>
          </div>
          {
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>תאריך</StyledTableCell>
                    <StyledTableCell>שם צוות</StyledTableCell>
                    <StyledTableCell>שם נציג</StyledTableCell>
                    <StyledTableCell align="right">כמות שיחות</StyledTableCell>
                    <StyledTableCell align="right">פיריון</StyledTableCell>
                    <StyledTableCell align="right">ניתוק - TV</StyledTableCell>
                    <StyledTableCell align="right">
                      ניתוק - Fiber
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      אחוז שימור - TV
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      אחוז שימור - Fiber
                    </StyledTableCell>
                    <StyledTableCell align="right">מכר - Fiber</StyledTableCell>
                    <StyledTableCell align="right">מכר - TV</StyledTableCell>
                    <StyledTableCell align="right">EasyMesh</StyledTableCell>
                    <StyledTableCell align="right">שדרוג</StyledTableCell>
                    <StyledTableCell align="right">סמ׳׳ט</StyledTableCell>
                    <StyledTableCell align="right">יעדים</StyledTableCell>
                    <StyledTableCell align="right">עדכון פרטים</StyledTableCell>
                    <StyledTableCell align="right">
                      מחיקת תפעול נציג
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(operationsTeam) &&
                    operationsTeam.map((operationsTeam, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">
                          {moment(operationsTeam.createTime).format(
                            "DD/MM/YYYY"
                          )}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {operationsTeam.teamName}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {operationsTeam.nameAgent}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {operationsTeam.numberCalls}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {operationsTeam.productivity}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {operationsTeam.tvDisconnection}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {operationsTeam.fiberDisconnection}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          style={{
                            backgroundColor:
                              parseFloat(
                                operationsTeam.simurTV.replace("%", "")
                              ) /
                                100 >=
                              0.79
                                ? "#62a462"
                                : parseFloat(
                                    operationsTeam.simurTV.replace("%", "")
                                  ) /
                                    100 >=
                                  0.67
                                ? "#c1c16f"
                                : "#ad6262",
                          }}>
                          {operationsTeam.simurTV}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          style={{
                            backgroundColor:
                              parseFloat(
                                operationsTeam.simurFiber.replace("%", "")
                              ) /
                                100 >=
                              0.79
                                ? "#62a462"
                                : parseFloat(
                                    operationsTeam.simurFiber.replace("%", "")
                                  ) /
                                    100 >=
                                  0.67
                                ? "#c1c16f"
                                : "#ad6262",
                          }}>
                          {operationsTeam.simurFiber}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {operationsTeam.sellerFiber}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {operationsTeam.sellerTV}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {operationsTeam.easyMesh}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {operationsTeam.upgradeProgress}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {operationsTeam.satisfaction}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          style={{
                            backgroundColor:
                              operationsTeam.sellerFiber +
                                operationsTeam.easyMesh +
                                operationsTeam.upgradeProgress +
                                operationsTeam.sellerTV >
                              3
                                ? "#62a462"
                                : "#ad6262",
                          }}>
                          {operationsTeam.sellerFiber +
                            operationsTeam.easyMesh +
                            operationsTeam.upgradeProgress +
                            operationsTeam.sellerTV}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <EditOperation
                            theIDoperation={operationsTeam.bizNumber}
                            dataOperation={operationsTeam}
                          />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <DeleteOperation
                            theIDoperation={operationsTeam.bizNumber}
                            dataOperation={operationsTeam}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          }
          <div className="titleOperationAndAgents">
            <h3 style={{ fontSize: "20px" }}>תפעול מצטבר צוותי</h3>
          </div>
          <OperatingAverageTeam />
        </>
      )}
    </>
  );
}
