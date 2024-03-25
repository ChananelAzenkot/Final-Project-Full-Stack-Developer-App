import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";
import "../styles/operation.css";

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

export default function OperatingAverage() {
  const [operationAverage, setOperationAverage] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/incrementalOperatingAverage`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOperationAverage([data]);
      });
  }, []);

  console.log(operationAverage);

  return (
    <>
      {
        <TableContainer component={Paper} id="container">
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>חודש</StyledTableCell>
                <StyledTableCell align="right">כמות שיחות</StyledTableCell>
                <StyledTableCell align="right">פיריון</StyledTableCell>
                <StyledTableCell align="right">ניתוק - TV</StyledTableCell>
                <StyledTableCell align="right">ניתוק - Fiber</StyledTableCell>
                <StyledTableCell align="right">אחוז שימור - Fiber</StyledTableCell>
                <StyledTableCell align="right">אחוז שימור - TV</StyledTableCell>
                <StyledTableCell align="right">מכירות - Fiber</StyledTableCell>
                <StyledTableCell align="right"> מכירות - TV</StyledTableCell>
                <StyledTableCell align="right">EasyMesh</StyledTableCell>
                <StyledTableCell align="right">שדרוג</StyledTableCell>
                <StyledTableCell align="right">סמ׳׳ט</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(operationAverage) && operationAverage.map((operationAverage , index) => (
                <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                    {moment(operationAverage.createTime).format('MM/YYYY')}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {operationAverage.totalNumberCalls}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {operationAverage.totalProductivity}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {operationAverage.totalTvDisconnection}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {operationAverage.totalFiberDisconnection}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    style={{
                      backgroundColor:
                        parseFloat(operationAverage.totalSimurFiber) / 100 >=
                        0.79
                          ? "#62a462"
                          : parseFloat(operationAverage.totalSimurFiber) /
                              100 >=
                            0.67
                          ? "#c1c16f"
                          : "#ad6262",
                    }}>
                    {operationAverage.totalSimurFiber}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    style={{
                      backgroundColor:
                        parseFloat(operationAverage.totalSimurTV) /
                          100 >=
                        0.79
                          ? "#62a462"
                          : parseFloat(operationAverage.totalSimurTV) /
                              100 >=
                            0.67
                          ? "#c1c16f"
                          : "#ad6262",
                    }}>
                    {operationAverage.totalSimurTV}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right">
                    {operationAverage.totalSellerFiber}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {operationAverage.totalSellerTV}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {operationAverage.totalEasyMesh}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {operationAverage.totalUpgradeProgress}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {operationAverage.totalSatisfaction}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
    </TableContainer>
      }
    </>
  );
}