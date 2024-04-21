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
import "../../styles/operation.css";
import SearchBar from "../../components/searchBar/SearchBar";
import SearchBarOperation from "../../components/searchBar/SearchBarOperation";
import { GeneralContext } from "../../App";
import EditClient from "./EditClient";
import DeleteClient from "./DeleteClient";

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

export default function MyEmployeeSupervisor() {
  const [operation, setOperation] = useState([]);
  const { snackbar } = useContext(GeneralContext);

  useEffect(() => {
    fetch(`http://localhost:4000/api/users`, {
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



  return (
    <>
      <div className="btnGroup">
              <div className="titleOperationAndAgents">
                <h4>{`ניהול משתמשים של המערכת`}</h4>
              </div>
              <div
                className="searchUser"
                style={{
                  display: "flex",
                  border: "1px solid black",
                  borderRadius: "10px",
                }}>
                <SearchBar />
                <SearchBarOperation />
              </div>
            </div>
      <TableContainer component={Paper} id="container">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          {operation && operation.length > 0 && (
            <TableHead>
              <TableRow>
                <StyledTableCell>תאריך הצטרפות</StyledTableCell>
                <StyledTableCell>שם פרטי</StyledTableCell>
                <StyledTableCell>שם משפחה</StyledTableCell>
                <StyledTableCell align="right">ראש צוות</StyledTableCell>
                <StyledTableCell align="right">מנהל מוקד</StyledTableCell>
                <StyledTableCell align="right">נציג / סוכן</StyledTableCell>
                <StyledTableCell align="right">מחלקת שירות</StyledTableCell>
                <StyledTableCell align="right">מחלקת שימור</StyledTableCell>
                <StyledTableCell align="right">שם הצוות</StyledTableCell>
                <StyledTableCell align="right">נייד</StyledTableCell>
                <StyledTableCell align="right">איימל</StyledTableCell>
                <StyledTableCell align="right">תמונה</StyledTableCell>
                <StyledTableCell align="right">עריכת משתמש</StyledTableCell>
                <StyledTableCell align="right">מחיקת משתמש</StyledTableCell>
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {Array.isArray(operation) &&
              operation.map((operation, index) => (
                <StyledTableRow key={operation.id || index}>
                  <StyledTableCell component="th" scope="row">
                    {moment(operation.createTime).format("DD/MM/YYYY")}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {operation.name.first + " " + operation.name.middle}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {operation.name.last}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {!operation.IsBusiness ? "לא" : "כן"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {!operation.isAdmin ? "לא" : "כן"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {!operation.IsBusiness && !operation.isAdmin ? "כן" : "לא"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {operation.serviceDepartment ? "כן" : "לא"}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right">
                    {operation.conservationDepartment ? "כן" : "לא"}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right">
                    {operation.teamName}
                  </StyledTableCell>
                      <StyledTableCell align="right">
                        {operation.phone}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {operation.email}
                      </StyledTableCell>
                      <StyledTableCell
                      align="right">
                        <img
                          src={operation.image.url}
                          alt="profile"

                          style={{
                            width: "50px", 
                            height: "50px", 
                            borderRadius: "10px",
                            objectFit: "cover",
                            boxShadow: "1px 1px 8px 1px black",
                          }}
                        />
                      </StyledTableCell>
                  <StyledTableCell align="right">
                    <EditClient
                      theIDclient={operation._id}
                      dataClient={operation}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <DeleteClient
                      theIDclient={operation._id}
                      dataClient={operation}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
