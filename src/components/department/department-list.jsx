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
import DepartmentAdd from "./department-add";
import DepartmentUpdate from "./department-update";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

export default function DepartmentList() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    loadDepartments();
  }, []);
  const loadDepartments = async (page) => {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/department`
    );
    setDepartments(result.data.reverse());
  };

  const deleteDepartment = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/department/${id}`)
      .catch((err) => {
        alert("Error");
      });
    loadDepartments();
  };

  return (
    <>
      <Main />
      <Box Box sx={{ width: 500 }}>
        <Grid container justifyContent="center">
          <Grid>
            <Tooltip placement="top">
              <h1>Department</h1>
            </Tooltip>
            <DepartmentAdd />
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
                <TableCell align="center">Office phone</TableCell>
                <TableCell align="center">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments.map((department, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">
                    {department.items.nameDepartment}
                  </TableCell>
                  <TableCell align="center">{department.officePhone}</TableCell>
                  <TableCell align="center">
                    <Button variant="text" startIcon={<VisibilityIcon />}>
                      <Link to={`/department-list-detail/${department.id}`}>
                        View
                      </Link>
                    </Button>
                    <DepartmentUpdate id={department.id} />
                    <Button
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        deleteDepartment(department.id);
                      }}
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
