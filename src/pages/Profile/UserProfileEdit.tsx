import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormLabel, InputLabel, ListItemText, MenuItem, OutlinedInput, Radio, RadioGroup, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import { Dispatch } from '@reduxjs/toolkit';
import React from 'react'
import { updateUserProfile, user} from '../../redux/reducer/userReducer';
import { useFormik } from 'formik';
import * as yup from "yup";
import { certifications, skills } from '../Register';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { closeEditForm } from '../../redux/reducer/userEditFormReducer';


type Props = {}
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

    const isModalOpen = useSelector((state:RootState) => state.userEditFormReducer.isUserEditOpen)
    

    const { userLogin } = useSelector((state: RootState) => state.userReducer);
    const [skillsList, setSkillsList] = React.useState<string[]|undefined>(userLogin?.user.skill);

    const handleChangeSkill = (event: SelectChangeEvent<typeof skillsList>) => {
      const {
        target: { value },
      } = event;
      setSkillsList(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    };
  
    const [certList, setCertList] = React.useState<string[]|undefined>(userLogin?.user.certification);
  
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
    
    const initialValues: user = {
      id: userLogin?.user.id|| "",
      name: userLogin?.user.name || "",
      email: userLogin?.user.email || "",
      password: userLogin?.user.password || "",
      phone: userLogin?.user.phone || "",
      birthday: userLogin?.user.birthday || "",
      gender: true,
      role: userLogin?.user.role || "",
      skill: userLogin?.user.skill || [],
      certification: userLogin?.user.certification || [],
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
  
      onSubmit: async (values: user) => {
        console.log("form data",values )
        dispatch(updateUserProfile(values))
      },
    });
  
  return (
    <div>
          <Dialog
        open={Boolean(isModalOpen)}
      >
        <DialogTitle>Edit Your Profile</DialogTitle>
        <DialogContent>
        <form
            className="flex flex-col gap-4 mt-6"
            action=""
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <Stack direction="row" gap={2}>
              <TextField
                sx={{width:"100%"}}
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
              ></TextField>


              <TextField
              sx={{width:"100%"}}
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
              ></TextField>

            </Stack>

            <Stack direction="row" gap={2}>
              <TextField
              sx={{width:"100%"}}
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
              ></TextField>

              <TextField
              sx={{width:"100%"}}
                label="Password confirm"
                className="form-control"
                type="password"
                name="passwordConfirm"
                required
              ></TextField>
            </Stack>

            <Stack direction="row" gap={2}>
              <TextField
              sx={{width:"100%"}}
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
              ></TextField>


              <TextField
              sx={{width:"100%"}}
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
              ></TextField>

            </Stack>

            <div>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Gender
              </FormLabel>
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
                <FormControlLabel
                  value={false}
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
            ></TextField>


            <InputLabel id="demo-multiple-checkbox-label">Skills</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={skillsList}
              onChange={handleChangeSkill}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {skills.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={(skillsList??[]).indexOf(name) > -1} />
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
              value={certList}
              onChange={handleChangeCert}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {certifications.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={(certList??[]).indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
                    <DialogActions>
          <Button onClick={()=>{dispatch(closeEditForm())}} >Cancel</Button>
          <Button variant='contained' type="submit">Save Change</Button>
        </DialogActions>
          </form>
        </DialogContent>

      </Dialog>
    </div>
  )
}

export default UserProfileEdit