import React, { useEffect } from "react";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useContext } from "react";
import { GeneralContext } from "../../App";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "../../styles/CreateCards.css";
import NewSaleInputs from "./NewSaleInputs";
import { handleInputSale } from "../../components/handleInput";
import confetti from "canvas-confetti";
import { jwtDecode } from "jwt-decode";
import { schemaSales } from "../../schemas/schemaSale";

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
    nameAgent: "",
    teamName: "",
    sellerFiber: "",
    sellerTV: "",
    easyMesh: "",
    upgradeProgress: "",
    customerCode: "",
  });

  const [user, setUser] = useState({
    name: {
      first: "",
      last: "",
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    console.log(userId);

    fetch(`http://localhost:4000/api/user/${userId}`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  const [nameAgent, setNameAgent] = useState("");
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    if (user && user.name && user.name.first) {
      setNameAgent(user.name.first + " " + user.name.last);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.teamName) {
      setTeamName(user.teamName);
    }
  }, [user]);

  useEffect(() => {
    setSaleData((prevState) => ({ ...prevState, teamName }));
  }, [teamName]);

  useEffect(() => {
    setSaleData((prevState) => ({ ...prevState, nameAgent }));
  }, [nameAgent]);

  const onInputChange = (e) => {
    handleInputSale(
      e,
      saleData,
      setSaleData,
      errors,
      setErrors,
      setIsFormValid
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = schemaSales.validate(saleData);
    if (error) {
      snackbar(error.details[0].message);
      return;
    }
    fetch(`http://localhost:4000/api/dailyOperationStartSale`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.token,
      },
      body: JSON.stringify(saleData),
    }).then((data) => {
      setSaleData(data);
      handleClose();
      snackbar("the card was created successfully !");

      const confettiCanvas = document.getElementById("confetti-canvas");
      confetti(confettiCanvas, {
        particleCount: 100,
        spread: 70,
        decay: 0.9,
        origin: { y: 0.6 },
      });
    });
  };

  return (
    <Box>
      <Button
        variant="contained"
        id="BtnStart"
        onClick={handleOpen}
        style={{ width: "auto" }}>
        הוספת מכירה
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box id="titleSale" sx={style}>
          <NewSaleInputs
            nameAgent={nameAgent}
            teamName={teamName}
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
