import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { GeneralContext } from "../../App";
import { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import { useMemo } from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { handleInputEdit } from "../../components/handleInput";
import { schemaSales } from "../../schemas/schemaSale";
import { EditPropSales } from "./EditPropSales";

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



export default function EditSales({ dataOperationSale, theIDoperationSale }) {
  const { snackbar, setIsLoader } = useContext(GeneralContext);
  const [errors, setErrors] = useState({});
  const [, setIsFormValid] = useState(false);

  EditSales.propTypes = {
    dataOperationSale: PropTypes.shape({
      teamName: PropTypes.string,
      nameAgent: PropTypes.string,
      sellerFiber: PropTypes.string,
      sellerTV: PropTypes.string,
      easyMesh: PropTypes.string,
      upgradeProgress: PropTypes.string,
      customerCode: PropTypes.string,
    }).isRequired,
    theIDoperationSale: PropTypes.string.isRequired,
  };

  const initialValues = useMemo(
    () => ({
      teamName: dataOperationSale.teamName || "",
      nameAgent: dataOperationSale.nameAgent || "",
      sellerFiber: dataOperationSale.sellerFiber || "",
      sellerTV: dataOperationSale.sellerTV || "",
      easyMesh: dataOperationSale.easyMesh || "",
      upgradeProgress: dataOperationSale.upgradeProgress || "",
        customerCode: dataOperationSale.customerCode || "",
    }),
    [dataOperationSale]
  );

  const [saleDataUpDate, setSaleDataUpDate] = useState(initialValues);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { id } = useParams();

  useEffect(() => {
    if (id === "new") {
      setSaleDataUpDate(initialValues);
    } else if (id !== undefined) {
      setIsLoader(true);
      fetch(`hhttp://localhost:4000/api/operationSale/${id}`, {
        credentials: "include",
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setSaleDataUpDate(data);
          setIsLoader(false);
        });
    }
  }, [id, setIsLoader, initialValues]);

const onInputChange = (e) => {
  handleInputEdit(e, saleDataUpDate, setSaleDataUpDate, errors, setErrors, setIsFormValid);
};

  const save = async (e) => {
    e.preventDefault();
    const { error } = schemaSales.validate(saleDataUpDate);
    if (error) {
      snackbar(error.details[0].message);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:4000/api/dailyOperationUpdateSale/${theIDoperationSale}`,
        {
          credentials: "include",
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.token,
          },
          body: JSON.stringify(saleDataUpDate),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      handleClose();
      snackbar("the card is updated success !");
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation: " + error.message
      );
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
      <EditPropSales
        open={open}
        handleClose={handleClose}
        saleDataUpDate={saleDataUpDate}
        errors={errors}
        onInputChange={onInputChange}
        save={save}
      />
    </Box>
  );
}