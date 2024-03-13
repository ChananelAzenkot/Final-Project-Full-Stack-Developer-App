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
import IconButton from "@mui/material/IconButton";
import moment from "moment";
import "../styles/operation.css";
import ModalCardsEdit from "../Agent/EditOperation";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: "center",
    border: "1px solid white",
    borderRadius: "8px 8px 0 0",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "center",
    border: "1px solid black",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: "1px solid black",
    textAlign: "center",
  },
}));

export default function SalesOperationDaily() {
  const [seller, setSeller] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/api/operationSale`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSeller(data);
      });
  }, []);

  return (
    <>
      {
        <TableContainer component={Paper} id="container">
          <div className="btnGroup">
          </div>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>תאריך ביצוע</StyledTableCell>
                <StyledTableCell>שם צוות</StyledTableCell>
                <StyledTableCell>שם נציג</StyledTableCell>
                <StyledTableCell align="right">קוד לקוח</StyledTableCell>
                <StyledTableCell align="right">מכר - Fiber</StyledTableCell>
                <StyledTableCell align="right">מכר - TV</StyledTableCell>
                <StyledTableCell align="right">EasyMesh</StyledTableCell>
                <StyledTableCell align="right">שדרוג</StyledTableCell>
                <StyledTableCell align="right">יעדים</StyledTableCell>
                <StyledTableCell align="right">עדכון פרטים</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(seller) &&
                seller.map((seller, index) => (
                  <StyledTableRow key={seller.id || index}>
                    <StyledTableCell component="th" scope="row">
                      {moment(seller.createTime).format("DD/MM/YYYY")}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {seller.teamName}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {seller.nameAgent}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {seller.customerCode}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {seller.sellerFiber}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {seller.sellerTV}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {seller.easyMesh}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {seller.upgradeProgress}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {seller.targets}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <IconButton>
                        <ModalCardsEdit theIDoperation={seller.bizNumber} dataOperation={seller} />
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
