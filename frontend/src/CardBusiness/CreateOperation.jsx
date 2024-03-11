import React from "react";
import Modal from "@mui/material/Modal";
import { useState,useEffect} from "react";
import "../styles/CreateCards.css";
import { useContext } from "react";
import { GeneralContext } from "../App";
import Box from "@mui/material/Box";
import "../styles/CreateCards.css";
import CreateModalCardForm from "./CreateMadeCardForm";
import Button from "@mui/material/Button";
import { jwtDecode } from "jwt-decode";
import { schemaOperations } from "../schemas/schemaOperation";
import {calculatePercentageTV ,calculatePercentageFiber, calculatePercentageTVcreate, calculatePercentageFiberCreate } from "../components/calculatePercentage";
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

export default function CreateOperation() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [errors, setErrors] = useState({});
  const [, setIsFormValid] = useState(false);

  const { snackbar } = useContext(GeneralContext);

  const [formData, setFormData] = useState({
    nameAgent: "",
    numberCalls: "",
    productivity: "",
    tvDisconnection: "",
    fiberDisconnection: "",
    simurTV: "",
    simurFiber: "",
    sellerFiber: "",
    sellerTV: "",
    easyMesh: "",
    upgradeProgress: "",
    satisfaction: "",
    teamName: "",
  });

    const [user, setUser] = useState({
    name: {
      first: "",
      last: "",
    },
    });

useEffect(() => {
  const token = localStorage.getItem('token');
  
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.userId;
  console.log(userId);

  fetch(
    `http://localhost:4000/api/user/${userId}`,
    {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-type": "application/json",
        'Authorization': token,
      }
    }
  )
    .then((res) => res.json())
    .then((data) => {
      setUser(data);
    });
}, []);

  const [nameAgent, setNameAgent] = useState('');
  const [teamName, setTeamName] = useState('');

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
  setFormData(prevState => ({ ...prevState, teamName }));
}, [teamName]);

useEffect(() => {
  setFormData(prevState => ({ ...prevState, nameAgent }));
}, [nameAgent]);

  const handleInput = (e) => {
    const { id, value } = e.target;
    const obj = { ...formData, [id]: value };
    setFormData(obj);

    const validate = schemaOperations.validate(obj, { abortEarly: false });
    const tempErrors = { ...errors };
    delete tempErrors[id];

    if (validate.error) {
      const item = validate.error.details.find((e) => e.context.key === id);

      if (item) {
        tempErrors[id] = item.message;
      }
    }
    setIsFormValid(!validate.error);
    setErrors(tempErrors);
  };

  useEffect(() => {
  calculatePercentageTVcreate(formData, setFormData);
}, [formData.numberCalls, formData.tvDisconnection, formData.simurTV]);

useEffect(() => {
  calculatePercentageFiberCreate(formData, setFormData);
}, [formData.numberCalls, formData.fiberDisconnection, formData.simurFiber]);

const calculatePercentageFiber = () => {
  if (!formData.numberCalls || isNaN(formData.fiberDisconnection) || isNaN(formData.numberCalls)) {
    setFormData(prevState => ({...prevState, simurFiber: '0%'}));
  } else if (formData.numberCalls && !formData.fiberDisconnection) {
    setFormData(prevState => ({...prevState, simurFiber: '100%'}));
  } else {
    const percentage = 1 - (parseFloat(formData.fiberDisconnection) / parseFloat(formData.numberCalls));
    setFormData(prevState => ({...prevState, simurFiber: (percentage * 100).toFixed(2) + '%'}));
  }
};
    useEffect(() => {
    calculatePercentageFiber();
  }, [formData.numberCalls, formData.fiberDisconnection, formData.simurFiber]);

const [isFetchSuccessful, setIsFetchSuccessful] = useState(false);

   const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = schemaOperations.validate(formData);
    if(error){
      snackbar(error.details[0].message);
      return;
    }
    fetch(
      `http://localhost:4000/api/dailyOperationAgentStart`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        'Authorization': localStorage.token,
      },
        body: JSON.stringify(formData),
      }
    )
      .then((data) => {
        setFormData(data);
        handleClose();
        calculatePercentageTV();
        calculatePercentageFiber();
        snackbar("the card was created successfully !");
        setIsFetchSuccessful(true);
      });
  };

  return (
    <Box>
      <Button
      disabled={isFetchSuccessful}
      variant="contained"
        id="BtnStart"
        onClick={handleOpen}
        style={{ width: "auto" }}>
          התחל נתונים
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box id="boxCards" sx={style}>
          {/* <Typography
            id="liners"
            style={{ width: "auto", textAlign: "center", height: "27px" }}
            variant="h6"
            component="h2">
            <b>נתונים ראשונים</b>
            <NoteAddIcon />
          </Typography> */}
          <CreateModalCardForm
          nameAgent={nameAgent}
          teamName={teamName}
            formData={formData}
            handleInput={handleInput}
            errors={errors}
            handleSubmit={handleSubmit}
          />
        </Box>
      </Modal>
    </Box>
  );
}
