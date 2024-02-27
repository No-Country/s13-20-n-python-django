import React from "react";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex h-[80vh]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default SharedLayout;
