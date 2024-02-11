import { ErrorMessage, useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
// import { http } from "../utils/Config";
import { UserRegister, registerApiAction } from "../redux/reducer/userReducer";
import { AppDispatch } from "../redux/store";
import {
  Button,
  Checkbox,
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
  TextField,
} from "@mui/material";
import { Dispatch } from "@reduxjs/toolkit";

type Props = {};

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

const skills = [
  'Data visualization',
  'User experience (UX) design',
  'Agile software development',
  'System software development',
  'E-commerce',
  'Leadership',
  'Public speaking',
  'Organization',
  'Search engine optimization (SEO)',
  'Scrum software development',
];

const certifications = [
  'Data visualization',
  'User experience (UX) design',
  'Agile software development',
  'System software development',
  'E-commerce',
  'Leadership',
  'Public speaking',
  'Organization',
  'Search engine optimization (SEO)',
  'Scrum software development',
];



const Register = (props: Props) => {
  const [skillsList, setSkillsList] = React.useState<string[]>([]);

  const handleChangeSkill = (event: SelectChangeEvent<typeof skillsList>) => {
    const {
      target: { value },
    } = event;
    setSkillsList(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const [certList, setCertList] = React.useState<string[]>([]);

  const handleChangeCert = (event: SelectChangeEvent<typeof certList>) => {
    const {
      target: { value },
    } = event;
    setCertList(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  const dispatch : Dispatch<any> = useDispatch();
  const initialValues: UserRegister = {
    id: 0,
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    gender: true,
    role: "",
    skill: [],
    certification: [],
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup.string().required("Password is required"),
      // passwordConfirm: yup.string().required("Confirm password is required"),
      phone: yup.string().required("Phone is required"),
      birthday: yup.string().required("Birthday is required"),
      gender: yup.boolean().required("Gender is required"),
      role: yup.string().required("Role is required"),
      skill: yup.array().required("Role is required"),
      certification: yup.array().required("Certification is required"),
    }),
    // submit form to BE

    onSubmit: async (values) => {
      alert(values);
      console.log("values,actions", { values });
      // const action = registerApiAction(values);
      dispatch(registerApiAction(values));
    },
  });

  // render form and use formik & yup
  return (
    <div className="flex-col">
      Register
      <form action="" onSubmit={formik.handleSubmit} noValidate>
        <TextField
          className="form-control"
          label="Name"
          type="text"
          name="name"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        ></TextField>
        {formik.errors.name && formik.touched.name ? (
          <div className="text-red-700">{formik.errors.name}</div>
        ) : null}

        <TextField
          className="form-control"
          label="Email address"
          type="email"
          placeholder="email@gmail.com"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          required
        ></TextField>
        {formik.errors.email && formik.touched.email ? (
          <div className="text-red-700">{formik.errors.email}</div>
        ) : null}

        <TextField
          className="form-control"
          label="Password"
          type="password"
          name="password"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        ></TextField>
        {formik.errors.password && formik.touched.password ? (
          <div className="text-red-700">{formik.errors.password}</div>
        ) : null}

        <TextField
          label="Password confirm"
          className="form-control"
          type="password"
          name="passwordConfirm"
          required
        ></TextField>

        <TextField
          label="Phone"
          className="form-control"
          type="tel"
          name="phone"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        ></TextField>
        {formik.errors.phone && formik.touched.phone ? (
          <div className="text-red-700">{formik.errors.phone}</div>
        ) : null}

        <TextField
          label="Birthday"
          className="form-control"
          type="text"
          name="birthday"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.birthday}
        ></TextField>
        {formik.errors.birthday && formik.touched.birthday ? (
          <div className="text-red-700">{formik.errors.birthday}</div>
        ) : null}

        <div>
          <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={formik.values.gender}
            onChange={formik.handleChange}
          >
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="Female"
            />
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
          value={formik.values.role}
        ></TextField>
        {formik.errors.role && formik.touched.role ? (
          <div className="text-red-700">{formik.errors.role}</div>
        ) : null}
                {/* <TextField
          className="form-control"
          label="Skill"
          type="text"
          name="skill"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.skill}
        ></TextField>
        {formik.errors.skill && formik.touched.skill ? (
          <div className="text-red-700">{formik.errors.skill}</div>
        ) : null} */}

<InputLabel id="demo-multiple-checkbox-label">Skills</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={formik.values.skill = skillsList}
          onChange={handleChangeSkill}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {skills.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={skillsList.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>


        <InputLabel id="demo-multiple-checkbox-label">Certifications</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={formik.values.certification = certList}
          onChange={handleChangeCert}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {certifications.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={certList.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>

{/* 

        <TextField
          className="form-control"
          label="Certification"
          type="text"
          name="certification"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.certification}
        ></TextField>
        {formik.errors.certification && formik.touched.certification ? (
          <div className="text-red-700">{formik.errors.certification}</div>
        ) : null} */}
        <Button
          variant="contained"
          type="submit"
          className="btn btn-primary"
          value="Submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Register;
