import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import React from "react";
import { updateUserProfile, user } from "../../redux/reducer/userReducer";
import { useFormik } from "formik";
import * as yup from "yup";
import { certifications, skills } from "../RegisterForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { closeEditForm } from "../../redux/reducer/userEditFormReducer";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import timezone from "dayjs/plugin/timezone";

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

const UserProfileEdit = (props: Props) => {
  dayjs.extend(utc);
  dayjs.extend(tz);
  dayjs.extend(timezone);
  const isModalOpen = useSelector(
    (state: RootState) => state.userEditFormReducer.isUserEditOpen
  );
  const timeZone = dayjs.tz.guess();

  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  const [birthday, setBirthDay] = React.useState<Dayjs | null>(
    dayjs.utc(userLogin?.user.birthday).tz(timeZone)
  );
  console.log("birthday", birthday);
  const [skillsList, setSkillsList] = React.useState<string[] | undefined>(
    userLogin?.user.skill
  );

  const handleChangeSkill = (event: SelectChangeEvent<typeof skillsList>) => {
    const {
      target: { value },
    } = event;
    setSkillsList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    // if (skillsList !== undefined) {
    //   formik.values.skill = skillsList
    // };
  };

  const [certList, setCertList] = React.useState<string[] | undefined>(
    userLogin?.user.certification
  );

  const handleChangeCert = (event: SelectChangeEvent<typeof certList>) => {
    const {
      target: { value },
    } = event;
    setCertList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    // if (certList !== undefined) {
    //   formik.values.certification = certList
    // };
  };

  const dispatch: Dispatch<any> = useDispatch();

  const [gender, setGender] = React.useState("female");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender((event.target as HTMLInputElement).value);

    const genderBool = gender === "female" ? true : false;

    formik.values.gender = genderBool;
  };

  const initialValues: user = {
    avatar: "",
    id: userLogin?.user.id || "",
    name: userLogin?.user.name || "",
    email: userLogin?.user.email || "",
    password: userLogin?.user.password || "",
    phone: userLogin?.user.phone || "",
    birthday: userLogin?.user.birthday || "",
    gender: userLogin?.user.gender || true,
    role: userLogin?.user.role || "",
    skill: userLogin?.user.skill || [],
    certification: userLogin?.user.certification || [],
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
      phone: yup.string().required("Phone is required"),
      birthday: yup.string().required("Birthday is required"),
      gender: yup.boolean().required("Gender is required"),
      role: yup.string().required("Role is required"),
      skill: yup.array().required("Role is required"),
      certification: yup.array().required("Certification is required"),
    }),
    // submit form to BE

    onSubmit: async (values: user) => {
      console.log("form data", values);
      dispatch(updateUserProfile(values));
    },
  });

  return (
    <div>
      <Dialog
        open={Boolean(isModalOpen)}
        sx={{ width: { md: "800", xs: "400" } }}
      >
        <DialogTitle>Edit Your Profile</DialogTitle>
        <DialogContent>
          <form
            className="flex flex-col gap-4 mt-6"
            action=""
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <Stack direction={{ md: "row", xs: "column" }} gap={2}>
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

            <Stack direction={{ md: "row", xs: "column" }} gap={2}>
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
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                size="small"
              ></TextField>
            </Stack>

            <Stack direction={{ md: "row", xs: "column" }} gap={2}>
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

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  sx={{ width: "100%" }}
                  components={["DatePicker", "DatePicker"]}
                >
                  <DatePicker
                    slotProps={{ textField: { size: "small" } }}
                    sx={{ width: "100%" }}
                    label="Birthday"
                    // format="DD-MM-YYYY"
                    value={birthday}
                    onChange={(newValue) => {
                      setBirthDay(newValue);
                      formik.values.birthday = birthday?.toString()
                        ? birthday?.toString()
                        : "";
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

            <TextField
              disabled
              className="form-control"
              label="Role"
              type="text"
              name="role"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.role}
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
              size="small"
            ></TextField>

            <InputLabel id="demo-multiple-checkbox-label">Skills</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={(formik.values.skill = skillsList ? skillsList : [])}
              onChange={handleChangeSkill}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              size="small"
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
              value={(formik.values.certification = certList ? certList : [])}
              onChange={handleChangeCert}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              size="small"
            >
              {certifications.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={(certList ?? []).indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
            <DialogActions>
              <Button
                onClick={() => {
                  dispatch(closeEditForm());
                }}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Save Change
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfileEdit;
