import Footer from "@/components/footer/Footer";
import NavBar from "@/components/header/NavBar";
import { loadStripe } from "@stripe/stripe-js";
import { Suspense } from "react";
import PaymentMiddelware from "../components/PaymentMiddelware";

export default function layout({ children }) {

  return (
    <div>
      <PaymentMiddelware />
    <div>
      <NavBar />
      <div className="bg-black">
        <div className="max-w-[1400px] xl:mx-auto py-5 md:py-10 mx-5">
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </div>
      </div>
      <Footer />
    </div>
    </div>
  );
}
