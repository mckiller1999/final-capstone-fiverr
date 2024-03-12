import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";
import "../index.css";

type Props = {};

const HomeTemplate = (props: Props) => {
  return (
    <div className="font-sans font-normal ">
      <Header />
      <section style={{ minHeight: 550 }}>
        <Outlet />
      </section>

      <Footer />
    </div>
  );
};

export default HomeTemplate;
