import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import * as yup from "yup";
import { singinActionApi } from "../redux/reducer/userReducer";
import { Alert, DialogContent } from "@mui/material";

import { openRegisterForm } from "../redux/reducer/registerFormReducer";
import CheckIcon from "@mui/icons-material/Check";
import { useFormik } from "formik";

// TODO remove, this demo shouldn't need to reset the theme.

type Props = {};

export interface UserSignInForm {
  email: string;
  password: string;
}

const LoginForm = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();

  const signInFrm = useFormik<UserSignInForm>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("email cannot be blank")
        .email("email is invalid"),
      password: yup.string().required("password cannot be blank"),
    }),
    onSubmit: (values: UserSignInForm) => {
      const action = singinActionApi(values);
      dispatch(action);
    },
  });

  const isToastOpen = useSelector(
    (state: RootState) => state.toastMessage.isToastMessageOpen
  );

  return (
    <DialogContent>
      {isToastOpen ? (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Registration is successful, you can now sign in.
        </Alert>
      ) : null}

      <div className="interText700">Sign in</div>
      <Grid container className="mt-2" gap={1}>
        <Grid item>
          <div className="interBody mb-4">Don't have an account?</div>
        </Grid>
        <Grid item>
          <Link
            component="button"
            className="interBody"
            onClick={() => {
              dispatch(openRegisterForm());
            }}
          >
            Join us now
          </Link>
        </Grid>
      </Grid>
      <Box
        width="100%"
        component="form"
        onSubmit={signInFrm.handleSubmit}
        noValidate
        alignItems={"center"}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={signInFrm.handleChange}
          onBlur={signInFrm.handleBlur}
          size="small"
        />
        <p className=" text-red-900">
          {signInFrm.errors.email && signInFrm.errors.email}
        </p>
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={signInFrm.handleChange}
          onBlur={signInFrm.handleBlur}
          size="small"
        />
        <p className=" text-red-900">
          {signInFrm.errors.password && signInFrm.errors.password}
        </p>

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
          sx={{ display: "block" }}
        />
        <Button
          type="submit"
          color="success"
          fullWidth
          variant="contained"
          sx={{
            width: { md: 400, xs: 260 },
            height: 50,
            alignSelf: "center",
            marginTop: 2,
            backgroundColor: `rgb(20 83 45)`,
            borderRadius: 8,
          }}
          disableElevation
        >
          Sign in
        </Button>
      </Box>
    </DialogContent>
  );
};

export default LoginForm;
