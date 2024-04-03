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
import moment from "moment";
import "../styles/operation.css";
import { GeneralContext } from "../App";

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

export default function OperatingAverageSale() {

  const [operationAverageSale, setOperationAverageSale] = useState([]);
  const { snackbar } = useContext(GeneralContext);

  useEffect(() => {
    fetch(`http://localhost:4000/api/dailyOperatingAverageSale`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOperationAverageSale([data]);
        snackbar(data.message ? data.message : "מכירות יומיות נטענו בהצלחה ! ");
      });
  }, []);

    const [operation, setOperation] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/operationId`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOperation(data);
        setTimeout(() => {
          snackbar(data.message ? data.message : "התפעול נטען בהצלחה ! ");
        }, 2000);
      });
  }, []);

  const theOperation = operation[0]?.bizNumber;

useEffect(() => {
  if (operationAverageSale.length > 0) {
const updateData = {
  sellerFiber: operationAverageSale[0][Object.keys(operationAverageSale[0])[0]].totalSellerFiber,
  sellerTV: operationAverageSale[0][Object.keys(operationAverageSale[0])[0]].totalSellerTV,
  easyMesh: operationAverageSale[0][Object.keys(operationAverageSale[0])[0]].totalEasyMesh,
  upgradeProgress: operationAverageSale[0][Object.keys(operationAverageSale[0])[0]].totalUpgradeProgress,
};

if (theOperation === undefined){
  snackbar(`אין תפעול יומי זמין כרגע`)
}else{
      fetch(`http://localhost:4000/api/dailyOperationAgentUpdateForSale/${theOperation}`, {
      credentials: "include",
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.token,
      },
      body: JSON.stringify(updateData),
    })
      .then((res) => res.json())
      .then((data) => {
        snackbar(data.message ? data.message : `המכירות עודכנו בהצלחה ! ${moment().format("HH:mm")}`);
      });
}
  }
}, [operationAverageSale[0]]);

  return (
    <>
      {
        <TableContainer component={Paper} id="container">
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ס׳׳כ פעולות</StyledTableCell>
                <StyledTableCell align="right">מכירות - Fiber מצטבר</StyledTableCell>
                <StyledTableCell align="right"> מכירות - TV מצטבר</StyledTableCell>
                <StyledTableCell align="right">EasyMesh - מצטבר</StyledTableCell>
                <StyledTableCell align="right">שדרוג - מצטבר</StyledTableCell>
              </TableRow>
            </TableHead>
       <TableBody>
  {operationAverageSale[0] && (
    <StyledTableRow key={0}>
      <StyledTableCell component="th" scope="row">
         {Object.values(operationAverageSale[0][Object.keys(operationAverageSale[0])[0]]).reduce((a, b) => a + b, 0)}
      </StyledTableCell>
      <StyledTableCell align="right">
        {operationAverageSale[0][Object.keys(operationAverageSale[0])[0]].totalSellerFiber}
      </StyledTableCell>
      <StyledTableCell align="right">
        {operationAverageSale[0][Object.keys(operationAverageSale[0])[0]].totalSellerTV}
      </StyledTableCell>
      <StyledTableCell align="right">
        {operationAverageSale[0][Object.keys(operationAverageSale[0])[0]].totalEasyMesh}
      </StyledTableCell>
      <StyledTableCell align="right">
        {operationAverageSale[0][Object.keys(operationAverageSale[0])[0]].totalUpgradeProgress}
      </StyledTableCell>
    </StyledTableRow>
  )}
</TableBody>
          </Table>
    </TableContainer>
      }
    </>
  );
}