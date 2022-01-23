import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import axios from "../../api/axios";
import { useHistory } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function AdminAdd() {
  const history = useHistory();

  const [admin, setAdmin] = useState({
    username: "",
    email: "",
    role: "",
  });

  const onInputChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/register`, admin)
      .catch((err) => {
        alert("Error");
      });
    history.push("/admin-list");
  };
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button variant="contained" color="success" onClick={() => setOpen(true)}>
        + Add Admin
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography component="h1" variant="h5">
            Add department
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="User Name"
              label="User Name "
              name="username"
              onChange={onInputChange}
              value={admin.username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              id="Email"
              onChange={onInputChange}
              value={admin.email}
            />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="role"
                  value={admin.role}
                  label="Manager"
                  onChange={(e) => onInputChange(e)}
                >
                  <MenuItem value={1} key={1}>
                    1
                  </MenuItem>
                  <MenuItem value={0} key={0}>
                    0
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <div align="right">
              <Button type="submit">Add</Button>
              <Button color="error" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
