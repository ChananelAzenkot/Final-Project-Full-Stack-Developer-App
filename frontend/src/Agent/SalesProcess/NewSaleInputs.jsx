import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PropTypes from "prop-types";

export default function NewSaleInputs({
  saleData,
  onInputChange,
  errors,
  handleSubmit,
  nameAgent,
  teamName,
}) {
  NewSaleInputs.propTypes = {
    saleData: PropTypes.object.isRequired,
    onInputChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    nameAgent: PropTypes.string.isRequired,
    teamName: PropTypes.string.isRequired,
  };
  return (
    <>
      <Typography
        id="linersSale"
        style={{ width: "auto", textAlign: "center" }}
        variant="h6"
        component="h2">
        הוספת מכירה 🤩
        <NoteAddIcon />
      </Typography>
      <TextField
        disabled
        size="small"
        id="nameAgent"
        label="שם נציג"
        variant="outlined"
        fullWidth
        margin="normal"
        nameAgent={nameAgent}
        value={nameAgent}
        onChange={onInputChange}
        error={Boolean(errors.nameAgent)}
        helperText={errors.nameAgent}
        style={{ width: "100%" }}
      />
      <TextField
        disabled
        size="small"
        id="teamName"
        label="שם הצוות"
        variant="outlined"
        fullWidth
        margin="normal"
        nameAgent={nameAgent}
        value={teamName}
        onChange={onInputChange}
        error={Boolean(errors.teamName)}
        helperText={errors.teamName}
        style={{ width: "100%" }}
      />
      <TextField
        autoComplete="off"
        size="small"
        id="customerCode"
        label="קוד הלקוח"
        variant="outlined"
        fullWidth
        margin="normal"
        value={saleData.customerCode}
        onChange={onInputChange}
        error={Boolean(errors.customerCode)}
        helperText={errors.customerCode}
      />
      <TextField
        autoComplete="off"
        size="small"
        id="sellerFiber"
        label="מכר - Fiber"
        variant="outlined"
        fullWidth
        margin="normal"
        value={saleData.sellerFiber}
        onChange={onInputChange}
        error={Boolean(errors.sellerFiber)}
        helperText={errors.sellerFiber}
      />
      <TextField
        autoComplete="off"
        size="small"
        id="sellerTV"
        label="מכר - TV"
        variant="outlined"
        fullWidth
        margin="normal"
        value={saleData.sellerTV}
        onChange={onInputChange}
        error={Boolean(errors.sellerTV)}
        helperText={errors.sellerTV}
      />
      <TextField
        autoComplete="off"
        size="small"
        id="easyMesh"
        label="EasyMesh"
        variant="outlined"
        fullWidth
        margin="normal"
        value={saleData.easyMesh}
        onChange={onInputChange}
        error={Boolean(errors.easyMesh)}
        helperText={errors.easyMesh}
      />
      <TextField
        autoComplete="off"
        size="small"
        id="upgradeProgress"
        label="שדרוג"
        variant="outlined"
        fullWidth
        margin="normal"
        value={saleData.upgradeProgress}
        onChange={onInputChange}
        error={Boolean(errors.upgradeProgress)}
        helperText={errors.upgradeProgress}
      />
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <IconButton
          id="btnCreateAndPress"
          style={{ width: "auto" }}
          onClick={handleSubmit}>
          <SendIcon />
        </IconButton>
      </Typography>
    </>
  );
}
