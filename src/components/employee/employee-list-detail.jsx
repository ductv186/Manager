import React, { useEffect, useState } from "react";
import Main from "./../Main";
import axios from "../../api/axios";
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
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

export default function EmployeeListDetail() {
  const [employee, setEmployee] = useState({
    nameEmployee: "",
    photo: "",
    cellPhone: "",
    jobTitle: "",
    email: "",
    manager: {
      id: "",
      nameDepartment: "",
    },
  });

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/employee/${id}`)
      .then((res) => {
        setEmployee(res.data);
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
              >{`Employee: ${employee.nameEmployee}`}</h1>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
      <Container fixed>
        <TableContainer>
          <Table aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Avatar</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Job Title</TableCell>
                <TableCell align="center">Derpartment</TableCell>
                <TableCell align="center">Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      alignItems: "center",
                      mx: "auto",
                    }}
                    alt="avatar"
                    src={`${process.env.REACT_APP_BASE_URL}/employee/${employee.photo}`}
                  />
                </TableCell>
                <TableCell align="center">{employee.email}</TableCell>
                <TableCell align="center">{employee.jobTitle}</TableCell>
                <TableCell align="center">
                  {employee.manager.nameDepartment}
                </TableCell>
                <TableCell align="center">{employee.cellPhone}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
