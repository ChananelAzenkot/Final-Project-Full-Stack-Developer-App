import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useContext, useState } from "react";
import { GeneralContext } from "../App";
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function MyCardBasic() {
  const { snackbar } = useContext(GeneralContext);
  useEffect(() => {
    fetch(
      `http://localhost:4000/api/cards`,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
      });
  }, []);

  const [cards, setCards] = useState([]);

  const removeClient = (clientId) => {
    const confirmQuestion = window.confirm(
      "Are you sure you want to delete this client?"
    );
    if (!confirmQuestion) return;
    fetch(
      `https://api.shipap.co.il/admin/clients/${clientId}?token=d215263e-78c2-11ee-8f3c-14dda9d4a5f0`,
      {
        credentials: "include",
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      }
    )
      .then(() => {
        setCards(cards.filter((clients) => clients.id !== clientId));
      })
      .finally(() => {
        snackbar("the client has been deleted successfully !");
        setTimeout(() => (window.location.href = "/"), 1000);
      });
  };

  return (
    <>
      {
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>שם נציג</StyledTableCell>
                <StyledTableCell align="right">כמות שיחות</StyledTableCell>
                <StyledTableCell align="right">פיריון</StyledTableCell>
                <StyledTableCell align="right">אחוז שימור - Fiber</StyledTableCell>
                <StyledTableCell align="right">אחוז שימור - TV</StyledTableCell>
                <StyledTableCell align="right">מכר - Fiber</StyledTableCell>
                <StyledTableCell align="right">מכר - TV</StyledTableCell>
                <StyledTableCell align="right">EasyMesh WiFi 6</StyledTableCell>
                <StyledTableCell align="right">שדרוג</StyledTableCell>
                <StyledTableCell align="right">סמ׳׳ט</StyledTableCell>
                <StyledTableCell align="right">יעדים</StyledTableCell>
                <StyledTableCell align="right">עדכון פרטים</StyledTableCell>
                <StyledTableCell align="right">business</StyledTableCell>
                <StyledTableCell align="right">
                  <EditIcon />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <DeleteForeverIcon />
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cards.map((clients) => (
                <StyledTableRow key={clients.id}>
                  <StyledTableCell component="th" scope="row">
                    {cards.title}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {cards.createdTime}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {cards.subtitle}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {cards.description}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {cards.phone}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {cards.email}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {cards.web}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {cards.street}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {clients.houseNumber}
                  </StyledTableCell>
                  <StyledTableCell align="right">{clients.zip}</StyledTableCell>
                  <StyledTableCell align="right">
                    {clients.IsBusiness ? "Business" : "Not Business"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton
                      id="btnCreateAndPress"
                      onClick={() => removeClient(clients.id)}>
                      <DeleteForeverIcon />
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
