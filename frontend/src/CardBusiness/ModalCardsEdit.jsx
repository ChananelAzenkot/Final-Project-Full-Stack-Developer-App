import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { GeneralContext } from "../App";
import { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import { useMemo } from "react";
import { ModalCreateEdit } from "./ModalCreateEdit";
import Box from "@mui/material/Box";
import PropTypes from 'prop-types';
import { schemaOperations } from "../schemas/schemaOperation";

export default function ModalCardsEdit({ dataOperation , theIDoperation }) {

  const { snackbar, setIsLoader } = useContext(GeneralContext);
  const [errors, setErrors] = useState({});
  const [, setIsFormValid] = useState(false);
  const editProp = theIDoperation;
  console.log(editProp);

  ModalCardsEdit.propTypes = {
  dataOperation: PropTypes.shape({
    teamName: PropTypes.string,
    nameAgent: PropTypes.string,
    numberCalls: PropTypes.string,
    productivity: PropTypes.string,
    tvDisconnection: PropTypes.string,
    fiberDisconnection: PropTypes.string,
    simurFiber: PropTypes.string,
    simurTV: PropTypes.string,
    sellerFiber: PropTypes.string,
    sellerTV: PropTypes.string,
    easyMesh: PropTypes.string,
    upgradeProgress: PropTypes.string,
    satisfaction: PropTypes.string,
  }).isRequired,
  theIDoperation: PropTypes.string.isRequired,
};

  const initialValues = useMemo(
    () => ({
      teamName: dataOperation.teamName || "",
      nameAgent: dataOperation.nameAgent || "",
      numberCalls: dataOperation.numberCalls || "",
      productivity: dataOperation.productivity || "",
      tvDisconnection: dataOperation.tvDisconnection || "",
      fiberDisconnection: dataOperation.fiberDisconnection || "",
      simurFiber: dataOperation.simurFiber || "",
      simurTV: dataOperation.simurTV || "",
      sellerFiber: dataOperation.sellerFiber || "",
      sellerTV: dataOperation.sellerTV || "",
      easyMesh: dataOperation.easyMesh || "",
      upgradeProgress: dataOperation.upgradeProgress || "",
      satisfaction: dataOperation.satisfaction || "",
    }),
    [dataOperation]
  );


  const [item, setItem] = useState(initialValues);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  const { id } = useParams();

  useEffect(() => {
    if (id === "new") {
      setItem(initialValues);
    } else if (id !== undefined) {
      setIsLoader(true);
      fetch(
        `hhttp://localhost:4000/api/operationId/${id}`,
        {
          credentials: "include",
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setItem(data);
          setIsLoader(false);
        });
    }
  }, [id, setIsLoader, initialValues]);
  

  const handleInput = (e) => {
    const { id, value } = e.target;
    const obj = { ...item, [id]: value };
    setItem(obj);

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

     const calculatePercentageTV = () => {
    if (!item.numberCalls || isNaN(item.tvDisconnection) || isNaN(item.numberCalls)) {
      setItem(prevState => ({...prevState, simurTV: '0%'}));
    } else if (item.numberCalls && !item.tvDisconnection) {
      setItem(prevState => ({...prevState, simurTV: '100%'}));
    } else {
      const percentage = 1 - (parseFloat(item.tvDisconnection) / parseFloat(item.numberCalls));
      setItem(prevState => ({...prevState, simurTV: (percentage * 100).toFixed(2) + '%'}));
    }
  };
    useEffect(() => {
    calculatePercentageTV();
  }, [item.numberCalls, item.tvDisconnection, item.simurTV]);

const calculatePercentageFiber = () => {
  if (!item.numberCalls || isNaN(item.fiberDisconnection) || isNaN(item.numberCalls)) {
    setItem(prevState => ({...prevState, simurFiber: '0%'}));
  } else if (item.numberCalls && !item.fiberDisconnection) {
    setItem(prevState => ({...prevState, simurFiber: '100%'}));
  } else {
    const percentage = 1 - (parseFloat(item.fiberDisconnection) / parseFloat(item.numberCalls));
    setItem(prevState => ({...prevState, simurFiber: (percentage * 100).toFixed(2) + '%'}));
  }
};
    useEffect(() => {
    calculatePercentageFiber();
  }, [item.numberCalls, item.fiberDisconnection, item.simurFiber]);

const save = async (e) => {
  e.preventDefault();
  const { error } = schemaOperations.validate(item);
  if (error) {
    snackbar(error.details[0].message);
    return;
  }
  try {
    const response = await fetch(
      `http://localhost:4000/api/dailyOperationAgentUpdate/${theIDoperation}`,
      {
        credentials: "include",
        method: "PUT",
        headers: { 
          "Content-type": "application/json",
          Authorization: localStorage.token,
        },
        body: JSON.stringify(item),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    handleClose();
    snackbar("the card is updated success !");
  } catch (error) {
    console.error('There was a problem with the fetch operation: ' + error.message);
  }
};

  return (
    <Box>
      <IconButton
        id="btnCreateAndPress"
        style={{ width: "auto" }}
        onClick={handleOpen}>
        <EditIcon />
      </IconButton>
      <ModalCreateEdit
        open={open}
        handleClose={handleClose}
        item={item}
        errors={errors}
        handleInput={handleInput}
        save={save}
      />
    </Box>
  );
}
828772738

