import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import PropTypes from 'prop-types';

  function CreateModalCardForm(
  { formData, handleInput, errors, handleSubmit }
) {

  return (
    <>
      <TextField
        id="nameAgent"
        label="שם נציג"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.nameAgent}
        onChange={handleInput}
        error={Boolean(errors.nameAgent)}
        helperText={errors.nameAgent}
      />
      <TextField
        id="teamName"
        label="שם צוות"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.teamName}
        onChange={handleInput}
        error={Boolean(errors.teamName)}
        helperText={errors.teamName}
      />

      <TextField
        id="numberCalls"
        label="כמות השיחות"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.numberCalls}
        onChange={handleInput}
        error={Boolean(errors.numberCalls)}
        helperText={errors.numberCalls}
        type="number"
      />
      <TextField
        id="fiberDisconnection"
        label="ניתוק - Fiber"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.fiberDisconnection}
        onChange={handleInput}
        error={Boolean(errors.fiberDisconnection)}
        helperText={errors.fiberDisconnection}
      />
      <TextField
        id="tvDisconnection"
        label="ניתוק - TV"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.tvDisconnection}
        onChange={handleInput}
        error={Boolean(errors.tvDisconnection)}
        helperText={errors.tvDisconnection}
        type="number"
      />
      <TextField
        id="productivity"
        label="פיריון"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.productivity}
        onChange={handleInput}
        error={Boolean(errors.productivity)}
        helperText={errors.productivity}
      /> 
      <TextField
        id="sellerFiber"
        label="מכר - Fiber"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.sellerFiber}
        onChange={handleInput}
        error={Boolean(errors.sellerFiber)}
        helperText={errors.sellerFiber}
      />
      <TextField
        id="simurTV"
        label="אחוז שימור - TV"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.simurTV}
        onChange={handleInput}
        error={Boolean(errors.simurTV)}
        helperText={errors.simurTV}
        disabled
      />
      <TextField
        id="simurFiber"
        label="אחוז שימור - Fiber"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.simurFiber}
        onChange={handleInput}
        error={Boolean(errors.simurFiber)}
        helperText={errors.simurFiber}
        disabled
      />
      <TextField
        id="sellerTV"
        label="מכר - TV"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.sellerTV}
        onChange={handleInput}
        error={Boolean(errors.sellerTV)}
        helperText={errors.sellerTV}
      />
      <TextField
        id="easyMesh"
        label="EasyMesh"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.easyMesh}
        onChange={handleInput}
        error={Boolean(errors.easyMesh)}
        helperText={errors.easyMesh}
      />
      <TextField
        id="upgradeProgress"
        label="שדרוג"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.upgradeProgress}
        onChange={handleInput}
        error={Boolean(errors.upgradeProgress)}
        helperText={errors.upgradeProgress}
      />
      <TextField
        id="satisfaction"
        label="סמ׳׳ט"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.satisfaction}
        onChange={handleInput}
        error={Boolean(errors.satisfaction)}
        helperText={errors.satisfaction}
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

CreateModalCardForm.propTypes = {
  formData: PropTypes.shape({
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
    teamName: PropTypes.string,
  }).isRequired,
  handleInput: PropTypes.func.isRequired,
  errors: PropTypes.shape({
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
    teamName: PropTypes.string,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};


export default CreateModalCardForm;

