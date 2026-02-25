import React from "react";
import PricePlan from "./PricePlan";
import Stepper from "./Stapper";

const PriceCard = () => {
  return (
    <div className="lg:pb-[150px] md:pb-[110px] sm:py-20 py-0 bg-black">
      <div className="container">
        <div className="grid items-stretch grid-cols-12">
          <div className="col-span-12 xl:col-span-5 sm:col-span-6">
            <div className="h-full">
              <Stepper />
            </div>
          </div>

          <div className="col-span-12 mt-10 xl:col-span-7 sm:col-span-6 sm:mt-0">
            <div className="sm:h-full sm:bg-[linear-gradient(204.26deg,rgba(230,230,230,0.17)_-19.98%,rgba(128,128,128,0)_106.95%)]  rounded-tr-[10px] rounded-br-[10px]">
              <PricePlan />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
