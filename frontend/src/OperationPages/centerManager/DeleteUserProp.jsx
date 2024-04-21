import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import moment from "moment";
import IconButton from "@mui/material/IconButton";
import "../../styles/operation.css";

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
DeleteUserProp.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  item: PropTypes.object,
  errors: PropTypes.object,
  DeleteUser: PropTypes.func.isRequired,
};

export function DeleteUserProp({ open, handleClose, item, DeleteUser }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box id="buttonsModalWin" sx={style}>
        <div className="QuestionModal">
          <h2>{`האם אתה בטוח שאתה רוצה למחוק את המשתמש של ${item.name.first} ?`}</h2>
          <h3>{`שם צוות: ${item.teamName}`}</h3>
          <h3>{`שם נציג: ${item.name.first}`}</h3>
          <h3>{`תאריך יצירה: ${moment(item.createTime).format(
            "DD/MM/YYYY"
          )}`}</h3>
          <div className="buttonsModal">
            <IconButton onClick={DeleteUser} id="btnCreateAndPress">
              מחק
            </IconButton>
            <IconButton onClick={handleClose} id="btnCreateAndPress">
              ביטול
            </IconButton>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
