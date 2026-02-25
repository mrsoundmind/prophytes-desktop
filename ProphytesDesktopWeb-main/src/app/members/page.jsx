import React from "react";
import Footer from "@/components/footer/Footer";

import AllMembers from "@/components/ui/AllMembers";
import NewsLetter from "@/components/ui/NewsLetter";
import NavBar from "@/components/header/NavBar";

export const metadata = {
  title: "Members",
};
const ChapterDetails = () => {
  return (
    <>
      <NavBar />
      <main>
        <AllMembers />
        {/* <NewsLetter /> */}
      </main>
      <Footer />
    </>
  );
};

export default ChapterDetails;
