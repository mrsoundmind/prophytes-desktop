import Footer from "@/components/footer/Footer";

import React from "react";
import LoginForm from "./components/LoginForm";
import NewsLetter from "@/components/ui/NewsLetter";
import NavBar from "@/components/header/NavBar";
import NavBarFluid from "@/components/header/NavBarFluid";

export const metadata = {
  title: "Signin",
};

const SignIn = () => {
  return (
    <div>
      <NavBarFluid width="1480px" />
      <main>
        <LoginForm />
        {/* <NewsLetter /> */}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default SignIn;
