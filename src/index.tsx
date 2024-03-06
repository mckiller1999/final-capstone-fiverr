import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//react router dom
import {
  unstable_HistoryRouter as HistoryRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "./pages/Home";
import Login from "./pages/Login";
// import Register from "./pages/Register";
import Search from "./pages/Search";
import Profile from "./pages/Profile/Profile";
import Detail from "./pages/Detail";
import Job from "./pages/Job";
import HomeTemplate from "./templates/HomeTemplate";
//redux
import { store } from "./redux/store";
import { Provider } from "react-redux";
import AdminTemplate from "./templates/AdminTemplate";
import DashboardMagement from "./pages/Admin/DashboardMagement";
import UserMangement from "./pages/Admin/UserMangement";
import ProductMangement from "./pages/Admin/ProductMangement";
import Mangement from "./pages/Admin/Mangement";
import UserDetail from "./pages/Admin/UserDetail";
import MangementDetail from "./pages/Admin/MangementDetail";

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
          {/* <Route path="register" element={<Register />} /> */}
          <Route path="profile" element={<Profile />} />
          <Route path="detail">
            <Route path=":id" element={<Detail />} />
          </Route>
          <Route path="search" element={<Search />} />

          <Route path="job" element={<Job />} />
          <Route path="*" element={<Navigate to={"/"} />}></Route>
        </Route>
        <Route path="admin" element={<AdminTemplate />}>
          <Route index element={<DashboardMagement />}></Route>
          <Route path="users" element={<UserMangement />}></Route>
          <Route path="user-detail">
            <Route path=":id" element={<UserDetail />} />
          </Route>
          <Route path="orders" element={<Mangement />}></Route>
          <Route path="job-detail">
            <Route path=":id" element={<MangementDetail />} />
          </Route>
          <Route path="product" element={<ProductMangement />}></Route>
          <Route path="*" element={<Navigate to={"/"} />}></Route>
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);
