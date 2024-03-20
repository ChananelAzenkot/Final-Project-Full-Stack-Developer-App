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
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import moment from 'moment';

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
    border: '1px solid black',
    textAlign: 'center',
  },
}));

export default function IncrementalOperation() {

  const [operations, setOperations] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:4000/api/incrementalOperation`,
      {
        credentials: "include",
        headers: {
          "Content-type": "application",
          'Authorization': localStorage.token,
        }
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setOperations(data);
      });
  }, []);
  

  return (
    <>
      {
        <TableContainer component={Paper} id="container">
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
                <StyledTableCell align="right">מכירות - Fiber</StyledTableCell>
                <StyledTableCell align="right"> מכירות - TV</StyledTableCell>
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
              {Array.isArray(operations) && operations.map((operations , index) => (
                <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                    {moment(operations.createTime).format('DD/MM/YYYY')}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {operations.teamName}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {operations.nameAgent}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {operations.numberCalls}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {operations.productivity}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {operations.tvDisconnection}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {operations.fiberDisconnection}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    style={{
                      backgroundColor:
                        parseFloat(operations.simurFiber.replace("%", "")) / 100 >=
                        0.79
                          ? "#62a462"
                          : parseFloat(operations.simurFiber.replace("%", "")) /
                              100 >=
                            0.67
                          ? "#c1c16f"
                          : "#ad6262",
                    }}>
                    {operations.simurFiber}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    style={{
                      backgroundColor:
                        parseFloat(operations.simurTV.replace("%", "")) /
                          100 >=
                        0.79
                          ? "#62a462"
                          : parseFloat(operations.simurTV.replace("%", "")) /
                              100 >=
                            0.67
                          ? "#c1c16f"
                          : "#ad6262",
                    }}>
                    {operations.simurTV}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right">
                    {operations.sellerFiber}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {operations.sellerTV}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {operations.easyMesh}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {operations.upgradeProgress}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {operations.satisfaction}
                  </StyledTableCell>
                  <StyledTableCell align="right">{operations.targets}</StyledTableCell>
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
