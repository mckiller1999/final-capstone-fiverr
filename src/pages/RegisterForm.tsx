import { ErrorMessage, useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
// import { http } from "../utils/Config";
import { UserRegister, registerApiAction } from "../redux/reducer/userReducer";
import { AppDispatch, RootState } from "../redux/store";
import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  Link,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Dispatch } from "@reduxjs/toolkit";
import { closeRegisterForm } from "../redux/reducer/registerFormReducer";
import { openLoginForm } from "../redux/reducer/loginFormReducer";

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

export const skills = [
  "Data visualization",
  "User experience (UX) design",
  "Agile software development",
  "System software development",
  "E-commerce",
  "Leadership",
  "Public speaking",
  "Organization",
  "Search engine optimization (SEO)",
  "Scrum software development",
];

export const certifications = [
  "Data visualization",
  "User experience (UX) design",
  "Agile software development",
  "System software development",
  "E-commerce",
  "Leadership",
  "Public speaking",
  "Organization",
  "Search engine optimization (SEO)",
  "Scrum software development",
];

const RegisterForm = (props: Props) => {
  const { isBackDropOpen } = useSelector(
    (state: RootState) => state.backdropReducer
  );
  const [skillsList, setSkillsList] = React.useState<string[]>([]);

  const handleChangeSkill = (event: SelectChangeEvent<typeof skillsList>) => {
    const {
      target: { value },
    } = event;
    setSkillsList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [certList, setCertList] = React.useState<string[]>([]);

  const handleChangeCert = (event: SelectChangeEvent<typeof certList>) => {
    const {
      target: { value },
    } = event;
    setCertList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const dispatch: Dispatch<any> = useDispatch();
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
      // role: yup.string().required("Role is required"),
      skill: yup.array().required("Role is required"),
      certification: yup.array().required("Certification is required"),
    }),
    // submit form to BE

    onSubmit: async (values) => {
      alert(values);
      console.log("values,actions", { values });
      dispatch(registerApiAction(values));
    },
  });

  // render form and use formik & yup
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isBackDropOpen}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <DialogContent>
        <div className="interText700">Create an account</div>
        <Grid container className="mt-2" gap={1}>
          <Grid item>
            <div className="interBody mb-4">Already have an account?</div>
          </Grid>
          <Grid item>
            <Link
              component="button"
              variant="body1"
              onClick={() => {
                dispatch(closeRegisterForm());
              }}
            >
              Login now
            </Link>
          </Grid>
        </Grid>

        <form
          className="flex flex-col gap-4 mt-1"
          action=""
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <Stack direction="row" gap={2}>
            <TextField
              sx={{ width: "100%" }}
              className="form-control"
              label="Name"
              type="text"
              name="name"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              size="small"
            ></TextField>

            <TextField
              sx={{ width: "100%" }}
              className="form-control"
              label="Email address"
              type="email"
              placeholder="email@gmail.com"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              required
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              size="small"
            ></TextField>
          </Stack>

          <Stack direction="row" gap={2}>
            <TextField
              sx={{ width: "100%" }}
              className="form-control"
              label="Password"
              type="password"
              name="password"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              size="small"
            ></TextField>

            <TextField
              sx={{ width: "100%" }}
              label="Password confirm"
              className="form-control"
              type="password"
              name="passwordConfirm"
              required
              size="small"
            ></TextField>
          </Stack>

          <Stack direction="row" gap={2}>
            <TextField
              sx={{ width: "100%" }}
              label="Phone"
              className="form-control"
              type="tel"
              name="phone"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              size="small"
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
              value={formik.values.birthday}
              error={formik.touched.birthday && Boolean(formik.errors.birthday)}
              helperText={formik.touched.birthday && formik.errors.birthday}
              size="small"
            ></TextField>
          </Stack>

          <div>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Gender
            </FormLabel>
            <RadioGroup
              row
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
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Male"
              />
            </RadioGroup>
          </div>

          <FormControl size="small">
            <InputLabel id="demo-multiple-checkbox-label">Skills</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={(formik.values.skill = skillsList)}
              onChange={handleChangeSkill}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              size="small"
            >
              {skills.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={skillsList.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small">
            <InputLabel id="demo-multiple-checkbox-label">
              Certifications
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={(formik.values.certification = certList)}
              onChange={handleChangeCert}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              size="small"
            >
              {certifications.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={certList.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            type="submit"
            className="btn btn-primary"
            value="Submit"
            sx={{ width: 400, height: 50, alignSelf: "center", marginTop: 2,backgroundColor: `rgb(20 83 45)` }}
            disableElevation
          >
            Sign up
          </Button>
        </form>
      </DialogContent>
    </div>
  );
};

export default RegisterForm;
