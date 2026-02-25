import React from "react";

const VerifiedMemberBadge = (props) => {
  return (
    <div className="flex items-center gap-1 border border-[#383838] py-1 px-3 rounded-3xl bg-black group-hover:bg-white group-hover:border-0">
      <div
        className=" w-[28px] h-[28px] flex items-center justify-center rounded-full"
        // style={{
        //   backgroundColor: member.isPaid
        //     ? `#${member.organization?.color}`
        //     : "#16AD4B",
        // }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M8.95937 2.04258C9.53437 1.55091 10.476 1.55091 11.0594 2.04258L12.376 3.17591C12.626 3.39258 13.0927 3.56758 13.426 3.56758H14.8427C15.726 3.56758 16.451 4.29258 16.451 5.17591V6.59258C16.451 6.91758 16.626 7.39258 16.8427 7.64258L17.976 8.95925C18.4677 9.53425 18.4677 10.4759 17.976 11.0592L16.8427 12.3759C16.626 12.6259 16.451 13.0926 16.451 13.4259V14.8426C16.451 15.7259 15.726 16.4509 14.8427 16.4509H13.426C13.101 16.4509 12.626 16.6259 12.376 16.8426L11.0594 17.9759C10.4844 18.4676 9.54271 18.4676 8.95937 17.9759L7.64271 16.8426C7.39271 16.6259 6.92604 16.4509 6.59271 16.4509H5.15104C4.26771 16.4509 3.54271 15.7259 3.54271 14.8426V13.4176C3.54271 13.0926 3.36771 12.6259 3.15937 12.3759L2.03437 11.0509C1.55104 10.4759 1.55104 9.54258 2.03437 8.96758L3.15937 7.64258C3.36771 7.39258 3.54271 6.92591 3.54271 6.60091V5.16758C3.54271 4.28424 4.26771 3.55924 5.15104 3.55924H6.59271C6.91771 3.55924 7.39271 3.38424 7.64271 3.16758L8.95937 2.04258Z"
            fill="#34A853"
          />
          <path
            d="M6.98438 10.001L8.99271 12.0177L13.0177 7.98438"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className="text-sm font-medium text-white group-hover:text-black">
        D9 Verified
      </p>
    </div>
  );
};

export default VerifiedMemberBadge;
