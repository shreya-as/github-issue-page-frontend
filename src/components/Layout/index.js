import React from "react";
import AppSearchBar from "../AppSearchBar";
import Footer from "../Footer";
import Header from "../Header";

const Layout = () => {
  return (
    <>
      {/* header */}
      <Header />

      {/* search bar */}
      <AppSearchBar />

      {/* footer */}
      <Footer />
    </>
  );
};

export default Layout;
