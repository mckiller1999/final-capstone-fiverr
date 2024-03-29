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
import Detail from "./pages/Jobs/Detail";
import Job from "./pages/Jobs/Job";
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
import Loading from "./components/Loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Details from "./pages/Profile/Details";
import JobView from "./pages/Jobs/JobView";
import MangementDetail from "./pages/Admin/MangementDetail";
import CreateJob from "./pages/CreateJob";
import { JobModel } from "./models/Jobs";
import ProductDetail from "./pages/Admin/ProductDetail";
import ViewJobDetail from "./pages/Admin/ViewJobDetail";
import BookingJob from "./pages/Admin/BookingJob";
import BookingDetil from "./pages/Admin/BookingDetil";

export const history: any = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const handleCreateJob = (newJob: JobModel) => {
  // Xử lý logic khi tạo công việc mới ở đây
  console.log("New job:", newJob);
};
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          {/* <Route path="register" element={<Register />} /> */}
          <Route path="profile" element={<Profile />}></Route>
          <Route
            path="create-job"
            element={<CreateJob onCreateJob={handleCreateJob} />}
          ></Route>

          <Route path="view-detail">
            <Route path=":id" element={<Details />} />
          </Route>
          <Route path="detail">
            <Route path=":id" element={<Detail />} />
          </Route>
          <Route path="search" element={<Search />} />
          <Route path="job">
            <Route path=":id" element={<Job />}></Route>
          </Route>
          <Route path="job-view">
            <Route path=":id" element={<JobView />} />
          </Route>
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
          <Route path="product-detail">
            <Route path=":id" element={<ProductDetail />} />
          </Route>
          <Route path="job-view-detail">
            <Route path=":id" element={<ViewJobDetail />} />
          </Route>
          <Route path="*" element={<Navigate to={"/"} />}></Route>
          <Route path="bookjob" element={<BookingJob />}></Route>
          <Route path="booking-detail">
            <Route path=":id" element={<BookingDetil />} />
          </Route>
        </Route>
      </Routes>
    </HistoryRouter>

    {/* Loading Page */}
    <Loading />
    {/* Toast Message */}
    <ToastContainer />
  </Provider>
);
