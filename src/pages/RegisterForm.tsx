import { ErrorMessage, useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'
import timezone from 'dayjs/plugin/timezone'

// import { http } from "../utils/Config";
import { UserRegister, registerApiAction } from "../redux/reducer/userReducer";
import { AppDispatch, RootState } from "../redux/store";
import {
  Alert,
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
  "Citrix Certification",
  "Certified in Risk and Information Systems Control (CRISC)",
  "Cisco Certification ",
  "Amazon Web Service (AWS) Certified Solutions Architect Certificationt",
  "Certified Information System Auditor (CISA)",
  "Microsoft Certified Solutions Expert (MCSE) – Server Infrastructure",
  "Public Cloudera Certified Developer for Apache Hadoop (CCDH)",
  "Professional, Web Development Professional) ",
  "PMP Agile Certified Practitioner (PMI-ACP)",
  "Harvard Software Engineering Certificate ",
];

const RegisterForm = (props: Props) => {
  dayjs.extend(utc)
dayjs.extend(tz)
dayjs.extend(timezone)

  const { isBackDropOpen } = useSelector(
    (state: RootState) => state.backdropReducer
  );
  const [skillsList, setSkillsList] = React.useState<string[]>([]);
  const [birthday, setBirthDay] = React.useState<Dayjs | null>();

  console.log("setbirthday", birthday)
  

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

  const [gender, setGender] = React.useState('female');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender((event.target as HTMLInputElement).value);
    
    const genderBool = gender === 'female' ? true : false
    
    formik.values.gender = genderBool
    
  };
  
  const dispatch: Dispatch<any> = useDispatch();
  const initialValues: UserRegister = {
    id: 0,
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
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
      password: yup.string().required("Password is required").min(8, 'Password is too short - should be 8 chars minimum.').matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
      passwordConfirm: yup.string().required("Confirm password is required")
      .oneOf([yup.ref('password')], 'Passwords must match'),
      phone: yup.string().required("Phone is required"),
      birthday: yup.string().required("Birthday is required"),
      gender: yup.boolean().required("Gender is required"),
      // role: yup.string().required("Role is required"),
      skill: yup.array().required("Role is required"),
      certification: yup.array().required("Certification is required"),
    }),
    // submit form to BE

    onSubmit: async (values) => {
      // alert(values);
      console.log("values,actions",values);
      dispatch(registerApiAction(values));
    },
  });
  console.log("testbdayformik",formik.values.birthday)

  // render form and use formik & yup
  return (
    <DialogContent>
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
          <Stack direction={{ md: 'row', xs: 'column' }} gap={2}>
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

          <Stack direction={{ md: 'row', xs: 'column' }} gap={2}>
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
              onChange={formik.handleChange}
              value={formik.values.passwordConfirm}
              onBlur={formik.handleBlur}
              error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
              helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
              required
              size="small"
            ></TextField>
          </Stack>

          <Stack direction={{ md: 'row', xs: 'column' }} gap={2}>
            <TextField
              sx={{ width: "100%", marginTop: 1}}
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


<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer sx={{ width: "100%" }} components={['DatePicker', 'DatePicker']}>
        <DatePicker
        slotProps={{ textField: { size: 'small' } }}
          sx={{ width: "100%"}}
          label="Birthday"
          // format="DD-MM-YYYY"
          value={birthday}
          onChange={(newValue) => {
            console.log("newValue",newValue)
            // const timeZone = dayjs.tz.guess()
            // console.log("timeZone",timeZone)
            // const sstBirthday =dayjs.utc(newValue).tz(timeZone)
            setBirthDay(newValue);
            formik.values.birthday = birthday?.toString() ? birthday?.toString() : ""
          }}
        />
      </DemoContainer>
    </LocalizationProvider>


          </Stack>

          <div>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={gender}
              onChange={handleChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="male"
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
            color="success"
            type="submit"
            className="btn btn-primary"
            value="Submit"
            sx={{ width: {md: 400, xs: 260}, height: 50, alignSelf: "center", marginTop: 2,backgroundColor: `rgb(20 83 45)`, borderRadius: 8 }}
            disableElevation
          >
            Sign up
          </Button>
        </form>
      </DialogContent>
    </DialogContent>
  );
};

export default RegisterForm;
