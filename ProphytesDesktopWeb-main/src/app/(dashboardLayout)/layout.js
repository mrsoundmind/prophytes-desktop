import Footer from "@/components/footer/Footer";
import NavBar from "@/components/header/NavBar";
import NavBarFluid from "@/components/header/NavBarFluid";

import React from "react";

export const metadata = {
  title: "Dashboard",
};

const layout = ({ children }) => {
  return (
    <div>
      <NavBarFluid width="1920px" />
      {children}

      {/* <Footer /> */}
    </div>
  );
};

export default layout;
