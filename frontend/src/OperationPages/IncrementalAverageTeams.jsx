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
import "../styles/operation.css";
import PropTypes from 'prop-types';
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

IncrementalAverageTeams.propTypes = {
  selectedMonth: PropTypes.string,
  setSelectedMonth: PropTypes.func,
}
export default function IncrementalAverageTeams({ selectedMonth, setSelectedMonth }) {

  const [operationAverage, setOperationAverage] = useState([]);
  const { snackbar } = useContext(GeneralContext);


    const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  useEffect(() => {
    fetch(`http://localhost:4000/api/incrementalOperationTeamAvg`, {
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
        snackbar(data.message ? data.message : "הממוצע תפעול של החודש נטען בהצלחה !");
      });
  }, []);

let operationAverageArray = [];
if (operationAverage[0]) {
  operationAverageArray[0] = Object.entries(operationAverage[0]).map(([monthYear, totals]) => ({
    monthYear,
    ...totals,
  }));
}

  return (
    <>
<select onChange={handleMonthChange} style={{display:"none"}}>
  {operationAverage[0] && Object.keys(operationAverage[0]).map((month, index) => <option key={index} value={month}>{month}</option>)}
</select>
      {
        <TableContainer component={Paper} id="container">
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>חודש</StyledTableCell>
                <StyledTableCell align="right">כמות שיחות מצטבר</StyledTableCell>
                <StyledTableCell align="right">פיריון מצטבר</StyledTableCell>
                <StyledTableCell align="right">ניתוק - TV מצטבר</StyledTableCell>
                <StyledTableCell align="right">ניתוק - Fiber מצטבר</StyledTableCell>
                <StyledTableCell align="right">אחוז שימור - TV מצטבר</StyledTableCell>
                <StyledTableCell align="right">אחוז שימור - Fiber מצטבר</StyledTableCell>
                <StyledTableCell align="right">מכירות - Fiber מצטבר</StyledTableCell>
                <StyledTableCell align="right"> מכירות - TV מצטבר</StyledTableCell>
                <StyledTableCell align="right">EasyMesh - מצטבר</StyledTableCell>
                <StyledTableCell align="right">שדרוג - מצטבר</StyledTableCell>
                <StyledTableCell align="right">סמ׳׳ט - מצטבר</StyledTableCell>
                <StyledTableCell align="right">פעולות הצוות</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
{Array.isArray(operationAverageArray) && operationAverageArray.map((operation, index) => {
  const operationData = operation[Object.keys(operation)[0]];
  return (
    <StyledTableRow key={index}>
      <StyledTableCell component="th" scope="row">
        {Object.keys(operation)[0]}
      </StyledTableCell>
      <StyledTableCell align="right">
        {operationData.numberCalls}
      </StyledTableCell>
        <StyledTableCell align="right">
            {operationData.productivity.toFixed(2)}
        </StyledTableCell>
        <StyledTableCell align="right">
            {operationData.tvDisconnection}
        </StyledTableCell>
        <StyledTableCell align="right">
            {operationData.fiberDisconnection}
        </StyledTableCell>
        <StyledTableCell align="right" style={{
            backgroundColor: parseFloat(operationData.simurTV) / 100 >= 0.79 ? "#62a462" : parseFloat(operationData.simurTV) / 100 >= 0.67 ? "#c1c16f" : "#ad6262",
        }}>
            {(operationData.simurTV.toFixed(2)) + "%"}
        </StyledTableCell>
                <StyledTableCell align="right" style={{
            backgroundColor: parseFloat(operationData.simurFiber) / 100 >= 0.79 ? "#62a462" : parseFloat(operationData.simurFiber) / 100 >= 0.67 ? "#c1c16f" : "#ad6262",
        }}>
            {(operationData.simurFiber.toFixed(2)) + "%"}
        </StyledTableCell>
        <StyledTableCell align="right">
            {operationData.sellerFiber}
        </StyledTableCell>
        <StyledTableCell align="right">
            {operationData.sellerTV}
        </StyledTableCell>
        <StyledTableCell align="right">
            {operationData.easyMesh}
        </StyledTableCell>
        <StyledTableCell align="right">
            {operationData.upgradeProgress}
        </StyledTableCell>
        <StyledTableCell align="right">
            {operationData.satisfaction}
        </StyledTableCell>
                <StyledTableCell align="right">
            {operationData.easyMesh+operationData.upgradeProgress+operationData.sellerFiber+operationData.sellerTV}
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