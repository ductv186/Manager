import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import axios from "../../api/axios";
import { useHistory } from "react-router-dom";

export default function DepartmentAdd() {
  const history = useHistory();

  const [department, setDepartment] = useState({
    nameDepartment: "",
    officePhone: "",
  });
  const onInputChange = (e) => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/department`, department)
      .catch((err) => {
        alert("Không thể tạo mới");
      });
    history.push("/department-list");
  };
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button variant="contained" color="success" onClick={() => setOpen(true)}>
        + Add Department
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
              id="Name"
              label="Name "
              name="nameDepartment"
              onChange={onInputChange}
              value={department.nameDepartment}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="officePhone"
              label="Phone"
              id="Phone"
              onChange={onInputChange}
              value={department.officePhone}
            />
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
