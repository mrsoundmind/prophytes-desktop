import Footer from "@/components/footer/Footer";
import NavBar from "@/components/header/NavBar";
import React from "react";

export const metadata = {
  title: "About",
};
export default function layout({ children }) {
  return (
    <div>
      <NavBar bgColor={"bg-black"} />
      {children}
      <Footer />
    </div>
  );
}
