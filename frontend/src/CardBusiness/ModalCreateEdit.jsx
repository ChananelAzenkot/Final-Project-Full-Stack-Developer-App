import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import { FormFields } from "./FormFields";
import PropTypes from 'prop-types';

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
ModalCreateEdit.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  item: PropTypes.object, 
  errors: PropTypes.object,
  handleInput: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
};

export function ModalCreateEdit({
  open,
  handleClose,
  item,
  errors,
  handleInput,
  save,
})
 {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box id="boxCards" sx={style}>
        <FormFields item={item} errors={errors} handleInput={handleInput} save={save} />
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <IconButton
            id="btnCreateAndPress"
            style={{ width: "auto" }}
            onClick={save}>
            <SaveIcon />
          </IconButton>
        </Typography>
      </Box>
    </Modal>
  );
}
