import Footer from "@/components/footer/Footer";
import NavBar from "@/components/header/NavBar";
import AllProphytes from "@/components/ui/AllProhphytes";
import NewsLetter from "@/components/ui/NewsLetter";
import React from "react";

export const metadata = {
  title: "Famous Prophytes",
};
const Prophytes = () => {
  return (
    <>
      <NavBar />
      <main>
        <AllProphytes />
        {/* <NewsLetter /> */}
      </main>
      <Footer />
    </>
  );
};

export default Prophytes;
