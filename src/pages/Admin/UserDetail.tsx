import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { ACCESS_TOKEN_CYBER } from "../../util/config";

import {
  Button,
  Checkbox,
  DialogActions,
  FormControlLabel,
  FormLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { Dispatch } from "@reduxjs/toolkit";
import { updateUserProfile, user } from "../../redux/reducer/userReducer";
import { useFormik } from "formik";

import { certifications, skills } from "../RegisterForm";
import { useDispatch } from "react-redux";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const UserDetail = () => {
  const { id } = useParams<{ id?: string }>(); // Cho phép giá trị id có thể là undefined
  const [UserDetail] = useState<user | null>(null);

  const getUserById = async (userId: string) => {
    try {
      const token = ACCESS_TOKEN_CYBER;
      const res = await axios({
        headers: {
          tokenCybersoft: `${token}`,
        },
        url: `https://fiverrnew.cybersoft.edu.vn/api/users/${userId}`,
        method: "GET",
      });
      // setUserDetail(res.data.content); // Đừng set UserDetail ở đây
      formik.setValues((prevValues) => ({
        ...prevValues,
        id: res.data.content.id || prevValues.id,
        name: res.data.content.name || prevValues.name,
        email: res.data.content.email || prevValues.email,
        password: res.data.content.password || prevValues.password,
        phone: res.data.content.phone || prevValues.phone,
        birthday: res.data.content.birthday || prevValues.birthday,
        gender: true,
        role: res.data.content.role || prevValues.role,
        skill: res.data.content.skill || prevValues.skill,
        certification:
          res.data.content.certification || prevValues.certification,
      }));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    if (id) {
      getUserById(id);
      console.log(UserDetail);
    }
  }, [id]);
  const [skillsList, setSkillsList] = React.useState<string[]>(
    UserDetail?.skill || []
  );

  const handleChangeSkill = (event: SelectChangeEvent<typeof skillsList>) => {
    const {
      target: { value },
    } = event;
    setSkillsList(typeof value === "string" ? value.split(",") : value);
  };

  const [certList, setCertList] = React.useState<string[]>(
    UserDetail?.certification || []
  );
  const handleChangeCert = (event: SelectChangeEvent<typeof certList>) => {
    const {
      target: { value },
    } = event;
    setCertList(typeof value === "string" ? value.split(",") : value);
  };

  const dispatch: Dispatch<any> = useDispatch();

  const initialValues: user = {
    id: UserDetail?.id || "",
    name: UserDetail?.name || "",
    email: UserDetail?.email || "",
    password: UserDetail?.password || "",
    phone: UserDetail?.phone || "",
    birthday: UserDetail?.birthday || "",
    gender: true,
    role: UserDetail?.role || "",
    skill: UserDetail?.skill || [],
    certification: UserDetail?.certification || [],
  };
  //console.log(initialValues);
  //console.log(UserDetail);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values: user) => {
      console.log("Initial formik values: ", formik.values);

      dispatch(updateUserProfile(values));
    },
  });

  return (
    <div>
      <form
        className="flex flex-col gap-4 mt-6"
        action=""
        onSubmit={formik.handleSubmit}
        noValidate
      >
        <Stack direction="row" gap={2}>
          <TextField
            sx={{ width: "100%" }}
            label="Name "
            className="form-control"
            type="text"
            name="name"
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name || UserDetail?.name || ""}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          ></TextField>
          <TextField
            sx={{ width: "100%" }}
            label="Phone Number"
            className="form-control"
            type="text"
            name="email"
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email || UserDetail?.email || ""}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          ></TextField>
        </Stack>
        <Stack direction="row" gap={2}>
          <TextField
            sx={{ width: "100%" }}
            label="Phone Number"
            className="form-control"
            type="text"
            name="phone"
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone || UserDetail?.phone || ""}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          ></TextField>

          <TextField
            sx={{ width: "100%" }}
            label="Birthday"
            className="form-control"
            type="text"
            name="birthday"
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.birthday || UserDetail?.birthday || ""}
            error={formik.touched.birthday && Boolean(formik.errors.birthday)}
            helperText={formik.touched.birthday && formik.errors.birthday}
          ></TextField>
        </Stack>
        <div>
          <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={formik.values.gender || UserDetail?.gender || ""}
            onChange={formik.handleChange}
          >
            <FormControlLabel value={true} control={<Radio />} label="Female" />
            <FormControlLabel value={false} control={<Radio />} label="Male" />
          </RadioGroup>
        </div>
        <TextField
          className="form-control"
          label="Role"
          type="text"
          name="role"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.role || UserDetail?.role || ""}
          error={formik.touched.role && Boolean(formik.errors.role)}
          helperText={formik.touched.role && formik.errors.role}
        ></TextField>
        <InputLabel id="demo-multiple-checkbox-label">Skills</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={skillsList || UserDetail?.skill || ""}
          onChange={handleChangeSkill}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {skills.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={(skillsList ?? []).indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
        <InputLabel id="demo-multiple-checkbox-label">
          Certifications
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={certList || UserDetail?.certification || ""}
          onChange={handleChangeCert}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {certifications.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={(certList ?? []).indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
        <DialogActions>
          <NavLink to={"/admin/users"}>Cancel</NavLink>
          <Button variant="contained" type="submit">
            Save Change
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default UserDetail;
