import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext, useState } from "react";
import { useEffect } from "react";
import moment from "moment";
import "../../../styles/operation.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { GeneralContext } from "../../../App";
import IncrementalAverageTeams from "./IncrementalAverageTeams";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: "15px",
    padding: "5px",
    margin: "5px",
    textAlign: "center",
    width: "100px",
    border: "1px solid white",
    borderRadius: "8px 8px 0 0",
    textShadow: "1px 1px 6px white",
    boxShadow: "1px 1px 3px 1px white",
  },
  [`&.${tableCellClasses.body}`]: {
    padding: "5px",
    margin: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    width: "100px",
    textAlign: "center",
    border: "1px solid black",
    boxShadow: "1px 1px 8px  1px black",
    textShadow: "1px 1px 6px black",
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

export default function IncrementalOperationTeams() {
  const [operationsTeam, setOperationsTeam] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(
    moment().format("MM/YYYY")
  );
  const [months, setMonths] = useState([]);
  const { snackbar } = useContext(GeneralContext);

  useEffect(() => {
    const token = localStorage.token;
    if (!token) {
      window.location.href = "/login";
    }
    fetch(`http://localhost:4000/api/incrementalOperationTeam`, {
      credentials: "include",
      headers: {
        "Content-type": "application",
        Authorization: localStorage.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          return;
        }
        const uniqueMonths = [
          ...new Set(
            data.map((operation) =>
              moment(operation.createTime).format("MM/YYYY")
            )
          ),
        ];
        setMonths(uniqueMonths);
        setOperationsTeam(data);
        snackbar(
          data.message ? data.message : "התפעול של החודש המצטבר נטען בהצלחה !"
        );
      });
  }, []);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const filteredOperations = operationsTeam.filter((operation) => {
    return moment(operation.createTime).format("MM/YYYY") === selectedMonth;
  });


  return (
    <>
      <div className="titleOperationAndAgents">
        <h3>{` תפעול צוות ${operationsTeam[0]?.teamName ? operationsTeam[0]?.teamName : ""} של חודש : ${moment(
          selectedMonth,
          "MM/YYYY"
        ).format("MM/YYYY")}`}</h3>
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120 }}
          style={{ marginTop: "-5px" }}>
          <InputLabel id="demo-simple-select-standard-label">
            בחירת חודש
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={selectedMonth}
            onChange={handleMonthChange}
            label="בחירת חודש">
            <MenuItem value={selectedMonth}>
              <em>חודשים מצטברים</em>
            </MenuItem>
            {months.map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {!filteredOperations.length ? (
        <div className="titleOperationAndAgents">
          <h3>{`אין תפעול מצטבר / חודשי לצוות עדין`}</h3>
        </div>
      ) : (
        <>
          {
            <TableContainer
              component={Paper}
              id="container"
              style={{ maxHeight: "400px", overflowY: "scroll" }}>
              <Table
                sx={{ minWidth: 700 }}
                stickyHeader
                aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>תאריך</StyledTableCell>
                    <StyledTableCell>שם צוות</StyledTableCell>
                    <StyledTableCell>שם נציג</StyledTableCell>
                    <StyledTableCell align="right">כמות שיחות</StyledTableCell>
                    <StyledTableCell align="right">פיריון</StyledTableCell>
                    <StyledTableCell align="right">ניתוק - TV</StyledTableCell>
                    <StyledTableCell align="right">
                      ניתוק - Fiber
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      אחוז שימור - TV
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      אחוז שימור - Fiber
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      מכירות - Fiber
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      מכירות - TV
                    </StyledTableCell>
                    <StyledTableCell align="right">EasyMesh</StyledTableCell>
                    <StyledTableCell align="right">שדרוג</StyledTableCell>
                    <StyledTableCell align="right">סמ׳׳ט</StyledTableCell>
                    <StyledTableCell align="right">פעולות מכר</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(filteredOperations) &&
                    filteredOperations.map((operations, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">
                          {moment(operations.createTime).format("DD/MM/YYYY")}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {operations.teamName}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {operations.nameAgent}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {operations.numberCalls}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {operations.productivity.toFixed(2)}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {operations.tvDisconnection}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {operations.fiberDisconnection}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          style={{
                            backgroundColor:
                              operations &&
                              operations.simurTV &&
                              operations.simurTV / 100 >= 0.79
                                ? "#62a462"
                                : operations &&
                                  operations.simurTV &&
                                  operations.simurTV / 100 >= 0.67
                                ? "#c1c16f"
                                : "#ad6262",
                          }}>
                          {operations && operations.simurTV
                            ? operations.simurTV.toFixed(2) + "%"
                            : ""}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          style={{
                            backgroundColor:
                              operations &&
                              operations.simurFiber &&
                              operations.simurFiber / 100 >= 0.79
                                ? "#62a462"
                                : operations &&
                                  operations.simurFiber &&
                                  operations.simurFiber / 100 >= 0.67
                                ? "#c1c16f"
                                : "#ad6262",
                          }}>
                          {operations && operations.simurFiber
                            ? operations.simurFiber.toFixed(2) + "%"
                            : ""}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {operations.sellerFiber}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {operations.sellerTV}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {operations.easyMesh}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {operations.upgradeProgress}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {operations.satisfaction.toFixed(2) + "%"}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          style={{
                            backgroundColor:
                              operations.sellerFiber +
                                operations.easyMesh +
                                operations.upgradeProgress +
                                operations.sellerTV >
                              44
                                ? "#62a462"
                                : "#ad6262",
                          }}>
                          {operations.sellerFiber +
                            operations.easyMesh +
                            operations.upgradeProgress +
                            operations.sellerTV}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          }
          <div className="titleOperationAndAgents">
            <h3 style={{ fontSize: "20px" }}>תפעול מצטבר של החודש</h3>
          </div>
          <IncrementalAverageTeams
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
        </>
      )}
    </>
  );
}
