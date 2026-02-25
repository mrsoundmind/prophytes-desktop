import React from "react";
import Image from "next/image";

import wave from "@/public/img/onboading/wave.png";
import heros from "@/public/img/onboading/hero.png";

const OnBoadingHero = () => {
  return (
    <div className="sm:block hidden bg-black relative -z-[99] bg-[linear-gradient(182.94deg,_rgba(230,230,230,0)_28.68%,_rgba(128,128,128,0.24)_98.89%)]">
      <Image
        className="block m-auto max-h-[520px] -z-[1]"
        src={heros}
        alt="heros"
      />
      <Image className="absolute bottom-0 -z-[9]" src={wave} alt="wave" />
    </div>
  );
};

export default OnBoadingHero;
