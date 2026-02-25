import Footer from "@/components/footer/Footer";
import NavBar from "@/components/header/NavBar";

import DetailsChapter from "@/components/ui/DetailsChapter";
import React from "react";

export const metadata = {
  title: "Chapters",
};

const ChapterDetails = () => {
  return (
    <>
      <NavBar />
      <main>
        <DetailsChapter />
        {/* <NewsLetter /> */}
      </main>
      <Footer />
    </>
  );
};

export default ChapterDetails;
