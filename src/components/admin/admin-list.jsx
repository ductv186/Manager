import React, { useEffect, useState } from "react";
import Main from "./../Main";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../../api/axios";
import Container from "@mui/material/Container";
import AdminAdd from "./admin-add";
export default function AdminList() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    loadAdmins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAdmins = async () => {
    const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/user`);
    setAdmins(result.data.reverse());
  };
  // Delete
  const deleteAdmin = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/user/${id}`)
      .catch((err) => {
        alert("Error");
      });
    loadAdmins();
  };

  return (
    <>
      <Main />
      <Box Box sx={{ width: 500 }}>
        <Grid container justifyContent="center">
          <Grid>
            <Tooltip placement="top">
              <h1>Admin List</h1>
            </Tooltip>
            <AdminAdd />
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
                <TableCell align="center">Permission</TableCell>
                <TableCell align="center">Option</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.map((admin, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{admin.username}</TableCell>
                  <TableCell align="center">{admin.email}</TableCell>
                  <TableCell align="center">{admin.role}</TableCell>
                  <TableCell align="center">
                    <Button
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => deleteAdmin(admin.id)}
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
