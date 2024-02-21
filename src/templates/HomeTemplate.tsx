import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Props = {};

const HomeTemplate = (props: Props) => {
  return (
    <>
      <Header />
      <section style={{ minHeight: 550 }}>
        <Outlet />
      </section>
      <Footer />
    </>
  );
};

export default HomeTemplate;
