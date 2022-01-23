import React, { useState, useEffect } from "react";
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

export default function EmployeeAdd() {
  const history = useHistory();

  const [employee, setEmployee] = useState({
    photo: "",
    nameEmployee: "",
    cellPhone: "",
    email: "",
    jobTitle: "",
    managerId: "",
  });

  const [photo, setPhoto] = useState({
    post: "",
    url: "",
  });

  const onInputChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    loadDerpartments();
  }, []);

  const loadDerpartments = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/department`
    );
    setDepartments(result.data.reverse());
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("nameEmployee", employee.nameEmployee);
    formdata.append("jobTitle", employee.jobTitle);
    formdata.append("cellPhone", employee.cellPhone);
    formdata.append("email", employee.email);
    formdata.append("managerId", employee.managerId);
    formdata.append("photo", photo.post, "employee.jpg");
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/employee`, formdata)
      .catch((err) => {
        alert("Không thể tạo mới");
      });
    history.push("/employee-list");
  };
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button variant="contained" color="success" onClick={() => setOpen(true)}>
        + Add Employee
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
            Add employee
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSubmit}>
            <div className="avatar">
              <img className="img-avatar" alt="avatar" src={photo.url} />
              <input
                name="photo"
                type="file"
                onChange={(e) => {
                  setPhoto({
                    post: e.target.files[0],
                    url: URL.createObjectURL(e.target.files[0]),
                  });
                }}
              />
            </div>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Name"
              label="Name "
              name="nameEmployee"
              onChange={onInputChange}
              value={employee.nameEmployee}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="cellPhone"
              label="Phone"
              id="Phone"
              onChange={onInputChange}
              value={employee.cellPhone}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              id="Email"
              onChange={onInputChange}
              value={employee.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="jobTitle"
              label="Job title"
              id="Job title"
              onChange={onInputChange}
              value={employee.jobTitle}
            />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Manager</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="managerId"
                  value={employee.managerId}
                  label="Manager"
                  onChange={(e) => onInputChange(e)}
                >
                  {departments.map((item) => (
                    <MenuItem value={item.id} key={item.id}>
                      {item.nameDepartment}
                    </MenuItem>
                  ))}
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
