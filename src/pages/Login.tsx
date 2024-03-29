import Box from "@mui/material/Box";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { closeLoginForm } from "../redux/reducer/loginFormReducer";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

import Slider from "react-slick";

import "../index.css";
import "../style.css";
import { useNavigate } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.

var settings = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
};

type Props = {};

export interface UserSignInForm {
  email: string;
  password: string;
}

const Login = (props: Props) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const isLoginFormOpen = useSelector(
    (state: RootState) => state.loginFormReducer.loginFormOpen
  );

  const showRegisterForm = useSelector(
    (state: RootState) => state.registerFormReducer.registerFormOpen
  );

  return (
    <div>
      <Dialog
        open={isLoginFormOpen}
        maxWidth="lg"
        PaperProps={{
          style: {
            borderRadius: 16,
          },
        }}
      >
        <Box
          style={{ height: 760 }}
          sx={{ display: { xs: "flex", sm: "flex", md: "flex" } }}
        >
          <Box
            className="w-1/2"
            sx={{ display: { xs: "none", sm: "none", md: "block" } }}
          >
            <div
              className="slider-container"
              style={{ width: "100%", height: "100%" }}
            >
              <div style={{ width: "100%", height: "100%" }}>
                <Slider {...settings}>
                  <div>
                    <div
                      style={{
                        backgroundImage: `url(/img/imgbg-1.jpg)`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        width: "100%",
                        height: "760px",
                      }}
                    >
                      <div className="text-center pt-10 px-8 interText500">
                        Hire <span className="fraunces500">top talent</span> and
                        get your projects done
                      </div>
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        backgroundImage: `url(/img/imgbg-3.jpg)`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        width: "100%",
                        height: "760px",
                      }}
                    >
                      <div className="text-white text-center pt-10 px-8 interText500">
                        Connect with skilled freelancers. Bring your projects{" "}
                        <span className="fraunces500">to life.</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        backgroundImage: `url(/img/imgbg-5.jpg)`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        width: "100%",
                        height: "760px",
                      }}
                    >
                      <div className="text-white text-center pt-10 px-8 interText500">
                        From design to coding, find the{" "}
                        <span className="fraunces500">perfect freelancer</span>{" "}
                        for you
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </Box>

          <DialogContent className="w-1/2">
            <IconButton
              color="default"
              onClick={() => {
                dispatch(closeLoginForm());
                navigate(`/`);
              }}
            >
              <CloseOutlinedIcon />
            </IconButton>

            {showRegisterForm ? <RegisterForm /> : <LoginForm />}
          </DialogContent>
        </Box>
      </Dialog>
    </div>
  );
};

export default Login;
