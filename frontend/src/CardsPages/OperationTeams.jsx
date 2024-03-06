import React, { useState } from "react";
import CreateCards from "../CardBusiness/CreateOperation";
import MyCard from "./Card";
import "../styles/CreateCards.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function OperationTeams() {
  const [cards, setCards] = useState([]);

  React.useEffect(() => {
    fetch(
      `http://localhost:4000/api/incrementalOperation`,
      {
        credentials: "include",
        method: "GET",
        headers: { "Content-type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
      });
  }, [cards]);

  return (
    <>
      {
        <Box className="inComing">
          <Typography variant="h3" className="tempTitle">
            Manage My Contacts
          </Typography>
          <Box className="underlineAbout" style={{ width: "900px" }}></Box>
          <CreateCards />
          <Grid container spacing={3}>
            {cards.map((card) => (
              <Grid item xs={12} sm={6} md={4} key={card.id}>
                <MyCard card={card} />
              </Grid>
            ))}
          </Grid>
        </Box>
      }
    </>
  );
}
