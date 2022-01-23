import React, { useEffect, useState } from "react";
import Main from "./../Main";
import axios from "../../api/axios";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Container from "@mui/material/Container";

export default function DepartmentListDetail() {
  const [departmentDetail, setDepartmentDetail] = useState([]);

  const { id } = useParams();

  const [department, setDepartment] = useState({
    nameDepartment: "",
    officePhone: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/department/${id}`)
      .then((res) => {
        setDepartment(res.data);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/department/managerId/${id}`)
      .then((res) => {
        setDepartmentDetail(res.data);
      });
  }, [id]);

  return (
    <>
      <Main />
      <Box Box sx={{ width: 500 }}>
        <Grid container justifyContent="center">
          <Grid>
            <Tooltip title="Add" placement="top">
              <h1
                sx={{ pl: "80px" }}
              >{`Department: ${department.nameDepartment}`}</h1>
            </Tooltip>
            <h2 sx={{ pl: "80px" }}>{`Phone: ${department.officePhone}`}</h2>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {departmentDetail.map((employee, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{employee.nameEmployee}</TableCell>
                  <TableCell align="center">{employee.email}</TableCell>
                  <TableCell align="center">{employee.jobTitle}</TableCell>
                  <TableCell align="center">
                    {employee.manager.nameDepartment}
                  </TableCell>
                  <TableCell align="center">{employee.cellPhone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
