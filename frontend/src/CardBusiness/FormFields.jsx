import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "../styles/operation.css";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import SaveIcon from "@mui/icons-material/Save";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: "center",
    border: "1px solid white",
    borderRadius: "8px 8px 0 0",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "center",
    border: "1px solid black",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: "1px solid black",
    textAlign: "center",
  },
}));

export function FormFields({ item, errors, handleInput, save }) {
  FormFields.propTypes = {
    item: PropTypes.any, // replace 'any' with the actual type of 'item'
    errors: PropTypes.object,
    handleInput: PropTypes.func,
    save: PropTypes.func,
  };
  
  return (
    <>
      {
        <TableContainer component={Paper} id="container">
          <div className="createOperationTitle">
            <h4>עדכון נתוני נציג</h4>
          </div>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>שם נציג</StyledTableCell>
                <StyledTableCell align="right">שם הצוות</StyledTableCell>
                <StyledTableCell align="right">כמות שיחות</StyledTableCell>
                <StyledTableCell align="right">פיריון</StyledTableCell>
                <StyledTableCell align="right">ניתוק - TV</StyledTableCell>
                <StyledTableCell align="right">ניתוק - Fiber</StyledTableCell>
                <StyledTableCell align="right">
                  אחוז שימור - Fiber
                </StyledTableCell>
                <StyledTableCell align="right">אחוז שימור - TV</StyledTableCell>
                <StyledTableCell align="right">מכר - Fiber</StyledTableCell>
                <StyledTableCell align="right">מכר - TV</StyledTableCell>
                <StyledTableCell align="right">EasyMesh</StyledTableCell>
                <StyledTableCell align="right">שדרוג</StyledTableCell>
                <StyledTableCell align="right">סמ׳׳ט</StyledTableCell>
                <StyledTableCell align="right">עדכון פרטים</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  <TextField
                    disabled
                    size="small"
                    id="nameAgent"
                    label="שם נציג"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    nameAgent={item.nameAgent}
                    value={item.nameAgent}
                    onChange={handleInput}
                    error={Boolean(errors.nameAgent)}
                    helperText={errors.nameAgent}
                    style={{ width: "100%" }}
                  />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <TextField
                    disabled
                    size="small"
                    id="teamName"
                    label="שם הצוות"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={item.teamName}
                    onChange={handleInput}
                    error={Boolean(errors.teamName)}
                    helperText={errors.teamName}
                    style={{ width: "100%" }}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField
                    size="small"
                    id="numberCalls"
                    label="כמות שיחות"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={item.numberCalls}
                    onChange={handleInput}
                    error={Boolean(errors.numberCalls)}
                    helperText={errors.numberCalls}
                    type="number"
                    style={{ width: "63%" }}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField
                    size="small"
                    id="productivity"
                    label="פיריון"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={item.productivity}
                    onChange={handleInput}
                    error={Boolean(errors.productivity)}
                    helperText={errors.productivity}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField
                    size="small"
                    id="tvDisconnection"
                    label="ניתוק - TV"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={item.tvDisconnection}
                    onChange={handleInput}
                    error={Boolean(errors.tvDisconnection)}
                    helperText={errors.tvDisconnection}
                    type="number"
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField
                    size="small"
                    id="fiberDisconnection"
                    label="ניתוק - Fiber"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={item.fiberDisconnection}
                    onChange={handleInput}
                    error={Boolean(errors.fiberDisconnection)}
                    helperText={errors.fiberDisconnection}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField
                    size="small"
                    id="simurFiber"
                    label="אחוז שימור - Fiber"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={item.simurFiber}
                    onChange={handleInput}
                    error={Boolean(errors.simurFiber)}
                    helperText={errors.simurFiber}
                    disabled
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField
                    size="small"
                    id="simurTV"
                    label="אחוז שימור - TV"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={item.simurTV}
                    onChange={handleInput}
                    error={Boolean(errors.simurTV)}
                    helperText={errors.simurTV}
                    disabled
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField
                    size="small"
                    id="sellerFiber"
                    label="מכר - Fiber"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={item.sellerFiber}
                    onChange={handleInput}
                    error={Boolean(errors.sellerFiber)}
                    helperText={errors.sellerFiber}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField
                    size="small"
                    id="sellerTV"
                    label="מכר - TV"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={item.sellerTV}
                    onChange={handleInput}
                    error={Boolean(errors.sellerTV)}
                    helperText={errors.sellerTV}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField
                    size="small"
                    id="easyMesh"
                    label="EasyMesh"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={item.easyMesh}
                    onChange={handleInput}
                    error={Boolean(errors.easyMesh)}
                    helperText={errors.easyMesh}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField
                    size="small"
                    id="upgradeProgress"
                    label="שדרוג"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={item.upgradeProgress}
                    onChange={handleInput}
                    error={Boolean(errors.upgradeProgress)}
                    helperText={errors.upgradeProgress}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField
                    size="small"
                    id="satisfaction"
                    label="סמ׳׳ט"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={item.satisfaction}
                    onChange={handleInput}
                    error={Boolean(errors.satisfaction)}
                    helperText={errors.satisfaction}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    id="btnCreateAndPress"
                    style={{ width: "auto" }}
                    onClick={save}>
                    <SaveIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      }
    </>
  );
}
