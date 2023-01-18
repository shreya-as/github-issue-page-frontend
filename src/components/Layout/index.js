import React, { memo } from "react";
import Footer from "../Footer";
import Header from "../Header";

const Layout = ({ children }) => {
  return (
    <>
      {/* header */}
      <Header />

      {children}
      {/* footer */}
      <Footer />
    </>
  );
};

export default memo(Layout);
