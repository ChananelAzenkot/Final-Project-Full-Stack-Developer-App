import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import moment from "moment";
import IconButton from "@mui/material/IconButton";
import "../styles/operation.css";

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

SearchBarProp.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  searchResults: PropTypes.array,
  error: PropTypes.object,
  loading: PropTypes.bool,
  handleSelectAgent: PropTypes.func.isRequired,
  selectedAgent: PropTypes.object,
  searchTerm: PropTypes.string,
};

export function SearchBarProp({
  open,
  handleClose,
  searchResults,
  error,
  loading,
  handleSelectAgent,
  selectedAgent,
  searchTerm,
}) {
  const filteredResults = searchResults.filter(
    (agent) =>
      agent.name &&
      agent.name.first &&
      agent.name.last &&
      searchTerm &&
      (agent.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.name.last.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (agent.bizNumber &&
          agent.bizNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (agent.teamName &&
          agent.teamName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (agent.phone &&
          agent.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (agent.email &&
          agent.email.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <Modal
      style={{ height: "100%" }}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box id="buttonsModalWin" sx={style}>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <div className="QuestionModal">
          {filteredResults.length > 0 && (
            <ul>
              <h4>תוצאות החיפוש</h4>
              <h3>{`מספר העובדים בחיפוש הוא : ${parseFloat(
                filteredResults.length
              )}`}</h3>
              {filteredResults.map((agent) => (
                <li key={agent._id}>
                  {agent.name.first} {agent.name.last}
                  <IconButton
                    id="btnCreateAndPress"
                    onClick={() => handleSelectAgent(agent)}>
                    בחר
                  </IconButton>
                </li>
              ))}
              {selectedAgent && (
                <div>
                  <h2>{`עובד הנבחר : ${selectedAgent.name.first} ${selectedAgent.name.last}`}</h2>
                  <h3>{`שם הצוות : ${selectedAgent.teamName}`}</h3>
                  <h3>{`ראש צוות : ${
                    selectedAgent.IsBusiness ? "כן" : "לא"
                  }`}</h3>
                    <h3>{`מחלקת : ${selectedAgent.conservationDepartment ? "שימור" : "שירות"} `}</h3>
                  <h3>{`מספר הנייד : ${selectedAgent.phone}`}</h3>
                  <h3>{`כתובת מייל : ${selectedAgent.email}`}</h3>
                  <h3>{`תאריך הצטרפות : ${moment(
                    selectedAgent.createTime
                  ).format("DD/MM/YYYY")}`}</h3>
                  <div className="buttonsModal">
                    <IconButton onClick={handleClose} id="btnCreateAndPress">
                      לסגור
                    </IconButton>
                  </div>
                </div>
              )}
            </ul>
          )}
          {filteredResults.length === 0 && (
            <div>
              <h4>תוצאות החיפוש :</h4>
              <p>לא נמצא פרטים עבור : {searchTerm}</p>
              <IconButton onClick={handleClose} id="btnCreateAndPress">
                לסגור
              </IconButton>
            </div>
          )}
        </div>
      </Box>
    </Modal>
  );
}
