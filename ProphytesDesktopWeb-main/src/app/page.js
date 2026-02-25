"use client";
import { Suspense } from "react";
import Footer from "@/components/footer/Footer";
import NavBarFluid from "@/components/header/NavBarFluid";
import Business from "@/components/ui/Business";
import Chapter from "@/components/ui/Chapter";
import FamousProphytes from "@/components/ui/FamousProphytes";
import Finantical from "@/components/ui/Finantical";
import HeorBanner from "@/components/ui/HeorBanner";
import HomeChat from "@/components/ui/HomeChat";
import Member from "@/components/ui/Member";
import MemberSkeleton from "@/components/skeleton/MemberSkeleton"

const Home = () => {
  return (
    <>
      <NavBarFluid width="1480px" />
      <main>
        <HeorBanner />
        <Suspense
          fallback={
            <div className="grid gap-4 mt-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <MemberSkeleton key={index} />
              ))}
            </div>
          }
        >
          <Member />
        </Suspense>
        <Chapter />
        <FamousProphytes />
        <Business />
        <HomeChat />
        <Finantical />
      </main>
      <Footer />
    </>
  );
};

export default Home;
