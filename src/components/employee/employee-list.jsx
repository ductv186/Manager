import React, { useEffect, useState } from "react";
import Main from "./../Main";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "../../api/axios";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import EmployeeAdd from "./employee-add";
import EmployeeUpdate from "./employee-update";
import { Link } from "react-router-dom";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/employee`
    );
    setEmployees(result.data.reverse());
  };

  const deleteEmployee = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/employee/${id}`)
      .catch((err) => {
        alert("Error");
      });
    loadEmployees();
  };

  return (
    <>
      <Main />
      <Box Box sx={{ width: 500 }}>
        <Grid container justifyContent="center">
          <Grid>
            <Tooltip placement="top">
              <h1>Employees</h1>
            </Tooltip>
            <EmployeeAdd />
          </Grid>
        </Grid>
      </Box>

      <Container fixed>
        <TableContainer>
          <Table aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell align="center">STT</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Job Title</TableCell>
                <TableCell align="center">Derpartment</TableCell>
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{employee.nameEmployee}</TableCell>
                  <TableCell align="center">{employee.email}</TableCell>
                  <TableCell align="center">{employee.jobTitle}</TableCell>
                  <TableCell align="center">
                    {employee.manager.nameDepartment}
                  </TableCell>
                  <TableCell align="center">{employee.cellPhone}</TableCell>
                  <TableCell align="center">
                    <Button variant="text" startIcon={<VisibilityIcon />}>
                      <Link to={`/employee-list-detail/${employee.id}`}>
                        View
                      </Link>
                    </Button>
                    <EmployeeUpdate id={employee.id} />
                    <Button
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => deleteEmployee(employee.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
