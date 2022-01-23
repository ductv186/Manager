import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "../../api/axios";
import { useHistory } from "react-router-dom";
import Main from "./../Main";

const theme = createTheme();

export default function ChangePassword() {
  const history = useHistory();

  const [changePassword, setChangePassword] = useState({
    username: localStorage.getItem("username"),
    oldPass: "",
    newPass: "",
    confirm: "",
  });

  const onInputChange = (e) => {
    setChangePassword({ ...changePassword, [e.target.id]: e.target.value });
  };

  console.log(changePassword.oldPass);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/user/auth/changePassword`,
        changePassword
      )
      .then((res) => {
        alert("Success");
        setChangePassword({
          oldPass: "",
          newPass: "",
          confirm: "",
        });
      })
      .catch((err) => {
        alert("Error");
        setChangePassword({
          oldPass: "",
          newPass: "",
          confirm: "",
        });
      });
    history.push("/changepassword");
  };
  return (
    <>
      <Main />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              {changePassword.username}
            </Typography>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="oldPass"
                label="Current Password"
                type="password"
                id="oldPass"
                value={changePassword.oldPass}
                onChange={onInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="newPass"
                label="New Password"
                type="password"
                id="newPass"
                value={changePassword.newPass}
                onChange={onInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirm"
                label="Verify"
                type="password"
                id="confirm"
                value={changePassword.confirm}
                onChange={onInputChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
