import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext, useState } from "react";
import { useEffect } from "react";
import "../../styles/operation.css";
import { GeneralContext } from "../../App";
import moment from "moment";

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

export default function OperatingAverageCentralized() {
  const [operationAverageByCenter, setOperationAverageByCenter] = useState([]);
  const { snackbar } = useContext(GeneralContext);

  useEffect(() => {
    fetch(`http://localhost:4000/api/dailyOperatingAverageByCenter`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOperationAverageByCenter([data]);
        snackbar(
          data.message ? data.message : "התפעול הצוותי היומי נטען בהצלחה !"
        );
      });
  }, []);

  useEffect(() => {}, [operationAverageByCenter]);

  return (
    <>
      {
        <TableContainer component={Paper} id="container">
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>נתון מוקדי</StyledTableCell>
                <StyledTableCell align="right">
                  כמות שיחות מצטבר
                </StyledTableCell>
                <StyledTableCell align="right">פיריון מצטבר</StyledTableCell>
                <StyledTableCell align="right">
                  ניתוק - TV מצטבר
                </StyledTableCell>
                <StyledTableCell align="right">
                  ניתוק - Fiber מצטבר
                </StyledTableCell>
                <StyledTableCell align="right">
                  אחוז שימור - TV מצטבר
                </StyledTableCell>
                <StyledTableCell align="right">
                  אחוז שימור - Fiber מצטבר
                </StyledTableCell>
                <StyledTableCell align="right">
                  מכירות - Fiber מצטבר
                </StyledTableCell>
                <StyledTableCell align="right">
                  {" "}
                  מכירות - TV מצטבר
                </StyledTableCell>
                <StyledTableCell align="right">
                  EasyMesh - מצטבר
                </StyledTableCell>
                <StyledTableCell align="right">שדרוג - מצטבר</StyledTableCell>
                <StyledTableCell align="right"> פעולות הצוות</StyledTableCell>
                <StyledTableCell align="right">סמ׳׳ט - מצטבר</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(operationAverageByCenter) &&
                operationAverageByCenter.map((operation, index) => {
                  const operationData = operation[Object.keys(operation)[0]];
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {moment(operationData.createTime).format("DD/MM/YYYY")}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {operationData.totalNumberCalls}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {operationData.totalProductivity}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {operationData.totalTvDisconnection}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {operationData.totalFiberDisconnection}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        style={{
                          backgroundColor:
                            parseFloat(operationData.totalSimurTV) / 100 >= 0.79
                              ? "#62a462"
                              : parseFloat(operationData.totalSimurTV) / 100 >=
                                0.67
                              ? "#c1c16f"
                              : "#ad6262",
                        }}>
                        {operationData.totalSimurTV}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        style={{
                          backgroundColor:
                            parseFloat(operationData.totalSimurFiber) / 100 >=
                            0.79
                              ? "#62a462"
                              : parseFloat(operationData.totalSimurFiber) /
                                  100 >=
                                0.67
                              ? "#c1c16f"
                              : "#ad6262",
                        }}>
                        {operationData.totalSimurFiber}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {operationData.totalSellerFiber}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {operationData.totalSellerTV}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {operationData.totalEasyMesh}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {operationData.totalUpgradeProgress}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {operationData.totalEasyMesh +
                          operationData.totalUpgradeProgress +
                          operationData.totalSellerTV +
                          operationData.totalSellerFiber}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {operationData.totalSatisfaction}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </>
  );
}
