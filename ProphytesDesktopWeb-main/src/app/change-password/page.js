import Footer from "@/components/footer/Footer";
import NavBar from "@/components/header/NavBar";

import NewsLetter from "@/components/ui/NewsLetter";
import Password from "@/components/ui/Password";
import React from "react";
const ChangePassword = () => {
  return (
    <>
      <NavBar />
      <main>
        <Password />
      </main>
      {/* <NewsLetter /> */}
      <Footer />
    </>
  );
};

export default ChangePassword;
