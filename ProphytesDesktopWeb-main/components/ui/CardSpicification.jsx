import React from "react";

const CardSpicification = ({ status, status2 }) => {
  return (
    <div className="mt-6 space-y-2">
      <p className={`font-gothic text-white text-base font-normal`}>
        {status && status}
      </p>

      <p className={`font-gothic  text-white text-base font-normal`}>
        {status2 && status2}
      </p>
    </div>
  );
};

export default CardSpicification;
