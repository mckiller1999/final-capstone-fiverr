import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//react router dom
import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Profile from "./pages/Profile/Profile";
import Detail from "./pages/Detail";
import Job from "./pages/Job";
import HomeTemplate from "./templates/HomeTemplate";
//redux
import { store } from "./redux/store";
import { Provider } from "react-redux";

export const history: any = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="detail">
            <Route path=":id" element={<Detail />} />
          </Route>
          <Route path="search" element={<Search />} />
          <Route path="job" element={<Job />} />
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);
