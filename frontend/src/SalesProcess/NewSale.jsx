import React from "react";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import "../styles/CreateCards.css";
import { useContext } from "react";
import { GeneralContext } from "../App";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "../styles/CreateCards.css";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import NewSaleInputs from "./NewSaleInputs";
import { handleInputSale } from "../components/handleInput";
import { schemaSale } from "./schemaSale";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function NewSale() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [errors, setErrors] = useState({});
  const [, setIsFormValid] = useState(false);

  const { snackbar } = useContext(GeneralContext);

  const [saleData, setSaleData] = useState({
    title: "",
    description: "",
    subtitle: "",
    phone: "",
    email: "",
    web: "",
    imgUrl: "",
    imgAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });

 const onInputChange = (e) => {
  handleInputSale(e, saleData, setSaleData, errors, setErrors, setIsFormValid);
};

   const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = schemaSale.validate(saleData);
    if(error){
      snackbar(error.details[0].message);
      return;
    }
    fetch(
      `https://api.shipap.co.il/business/cards?token=d215263e-78c2-11ee-8f3c-14dda9d4a5f0`,
      {
        credentials: "include",
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(saleData),
      }
    )
      .then((data) => {
        setSaleData(data);
        handleClose();
        snackbar("the card was created successfully !");
      });
  };

  return (
    <Box>
      <Button
        variant="contained"
        id="BtnStart"
        onClick={handleOpen}
        style={{ width: "auto" }}
      >
        הוספת מכירה
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box id="titleSale" sx={style}>
          <Typography
            id="linersSale"
            style={{ width: "auto", textAlign: "center" }}
            variant="h6"
            component="h2"
          >
            עדכון מכירה
            <NoteAddIcon />
          </Typography>
            <NewSaleInputs
              saleData={saleData}
              onInputChange={onInputChange}
              errors={errors}
              handleSubmit={handleSubmit}
              />
          </Box>

      </Modal>
    </Box>
);
}
