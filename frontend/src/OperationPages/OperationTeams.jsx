import { useState } from "react";
import "../styles/CreateCards.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import moment from 'moment';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center',
    border: '1px solid white',
    borderRadius: '8px 8px 0 0',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'center',
    border: '1px solid black',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: '1px solid black',
    textAlign: 'center',
  },
}));


export default function OperationTeams() {
  const [operationsTeam , setOperationsTeam] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:4000/api/operationTeam`,
      {
        credentials: "include",
        method: "GET",
        headers: { "Content-type": "application/json",
        'Authorization': localStorage.token,
      },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setOperationsTeam(data);
      });
  }, []);

  return (
    <>
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
                <StyledTableCell align="right">ניתוק - Fiber</StyledTableCell>
                <StyledTableCell align="right">אחוז שימור - Fiber</StyledTableCell>
                <StyledTableCell align="right">אחוז שימור - TV</StyledTableCell>
                <StyledTableCell align="right">מכר - Fiber</StyledTableCell>
                <StyledTableCell align="right">מכר - TV</StyledTableCell>
                <StyledTableCell align="right">EasyMesh</StyledTableCell>
                <StyledTableCell align="right">שדרוג</StyledTableCell>
                <StyledTableCell align="right">סמ׳׳ט</StyledTableCell>
                <StyledTableCell align="right">יעדים</StyledTableCell>
                <StyledTableCell align="right">
                  עדכון פרטים
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(operationsTeam) && operationsTeam.map((operationsTeam , index) => (
                <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                    {moment(operationsTeam.createTime).format('DD/MM/YYYY')}
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
                  <StyledTableCell align="right">
                    {operationsTeam.simurFiber}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {operationsTeam.simurTV}
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
                  <StyledTableCell align="right">{operationsTeam.targets}</StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton>
                      <EditIcon />
                    </IconButton>
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

