import Footer from "@/components/footer/Footer";
import NavBar from "@/components/header/NavBar";
import React from "react";

export const metadata = {
  title: "Terms & Service",
};

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
