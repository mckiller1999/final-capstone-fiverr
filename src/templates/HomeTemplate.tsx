import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

type Props = {};

const HomeTemplate = (props: Props) => {
  return (
    <>
      <Header />
      <section style={{ minHeight: 550 }}>
        <Outlet />
      </section>
      <footer className=" bg-gray-800 text-yellow-50 text-center p-20">
        Footer
      </footer>
    </>
  );
};

export default HomeTemplate;
