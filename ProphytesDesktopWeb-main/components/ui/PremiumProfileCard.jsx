import CardSpicification from "./CardSpicification";
import Image from "next/image";
import Link from "next/link";
import { useSendConnectionRequestMutation } from "@/src/redux/services/connectionApi";
import ActionButtonMobile from "./ActionButtonMobile";

import { organizations } from "@/src/configs/constants";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import ConnectIcon from "@/public/img/icon/ConnectIcon";
import coverPhoto from "@/public/img/home/cover-bg.png";

export default function PremiumProfileCard({ member }) {
  const [sendConnectionRequest, { isLoading: connRequestloading }] =
    useSendConnectionRequestMutation();

  const data = member?.data;
  const icons = [
    {
      link: "",
      svg: (
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.7168 0.75H13.3467C15.1 0.742935 16.2898 1.18426 17.0459 1.93945C17.8023 2.6953 18.25 3.89063 18.25 5.65918V10.3984C18.25 10.6755 18.2363 10.9506 18.209 11.209L18.207 11.2246C18.0822 12.6872 17.5987 13.6782 16.8467 14.3154C16.0846 14.961 14.9368 15.3378 13.2988 15.3379H12.8281C12.3188 15.338 11.7959 15.5627 11.4707 16.0156L11.4697 16.0146L10.0459 17.915C9.8452 18.1813 9.6405 18.25 9.5 18.25C9.37705 18.25 9.20485 18.1975 9.0293 18.0059L8.9541 17.915L7.53027 16.0146L7.52344 16.0059L7.38965 15.8564C7.24703 15.7176 7.0812 15.6102 6.92871 15.5332C6.72585 15.4309 6.45597 15.338 6.17188 15.3379H5.70117C3.81009 15.3379 2.64034 15.0919 1.91602 14.4619C1.21786 13.8545 0.750002 12.718 0.75 10.4131V5.6748C0.75 4.04629 1.12737 2.90494 1.77539 2.14746C2.41564 1.39912 3.4128 0.917426 4.88477 0.792969L4.90039 0.791016C5.16066 0.763759 5.43784 0.75 5.7168 0.75Z"
            stroke="black"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
    {
      link: data?.link?.website,
      svg: (
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5 20C15.7467 20 20 15.7467 20 10.5C20 5.25329 15.7467 1 10.5 1C5.25329 1 1 5.25329 1 10.5C1 15.7467 5.25329 20 10.5 20Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1 10.5H20"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.5031 1C12.8793 3.60144 14.2297 6.97743 14.3031 10.5C14.2297 14.0226 12.8793 17.3986 10.5031 20C8.12691 17.3986 6.77651 14.0226 6.70312 10.5C6.77651 6.97743 8.12691 3.60144 10.5031 1V1Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      link: "",
      svg: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.1279 4.44035C12.968 4.60425 13.74 5.01511 14.3453 5.62033C14.9505 6.22556 15.3613 6.99761 15.5252 7.83769M12.1279 1C13.8733 1.19389 15.5008 1.97549 16.7433 3.21645C17.9859 4.45741 18.7695 6.08398 18.9656 7.82909M18.1055 14.6926V17.2728C18.1065 17.5124 18.0574 17.7495 17.9615 17.969C17.8655 18.1884 17.7247 18.3854 17.5482 18.5474C17.3717 18.7093 17.1633 18.8326 16.9364 18.9093C16.7095 18.9861 16.4691 19.0146 16.2305 18.993C13.5839 18.7054 11.0416 17.8011 8.80797 16.3526C6.72985 15.032 4.96797 13.2701 3.64745 11.192C2.19388 8.94824 1.2893 6.3936 1.00698 3.73508C0.985488 3.49723 1.01375 3.25752 1.08998 3.0312C1.16621 2.80488 1.28872 2.59691 1.44972 2.42054C1.61073 2.24416 1.80669 2.10324 2.02514 2.00675C2.24359 1.91026 2.47974 1.86031 2.71855 1.86009H5.29881C5.71622 1.85598 6.12088 2.00379 6.43736 2.27597C6.75385 2.54815 6.96057 2.92612 7.01899 3.33944C7.12789 4.16518 7.32987 4.97595 7.62105 5.75628C7.73677 6.06413 7.76181 6.39869 7.69322 6.72034C7.62462 7.04198 7.46526 7.33722 7.23401 7.57106L6.1417 8.66337C7.36608 10.8166 9.14895 12.5995 11.3022 13.8239L12.3945 12.7316C12.6284 12.5003 12.9236 12.341 13.2453 12.2724C13.5669 12.2038 13.9015 12.2288 14.2093 12.3445C14.9896 12.6357 15.8004 12.8377 16.6262 12.9466C17.044 13.0055 17.4255 13.216 17.6983 13.5379C17.971 13.8598 18.116 14.2708 18.1055 14.6926Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      link: data?.link?.email,
      svg: (
        <svg
          width="21"
          height="19"
          viewBox="0 0 21 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.25 18H5.75C2.9 18 1 16.5 1 13V6C1 2.5 2.9 1 5.75 1H15.25C18.1 1 20 2.5 20 6V13C20 16.5 18.1 18 15.25 18Z"
            stroke="black"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.25 6.5L12.2765 9C11.298 9.82 9.6925 9.82 8.714 9L5.75 6.5"
            stroke="black"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      link: data?.link?.facebook,
      svg: (
        <svg
          width="13"
          height="22"
          viewBox="0 0 13 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 1H9C7.67392 1 6.40215 1.52678 5.46447 2.46447C4.52678 3.40215 4 4.67392 4 6V9H1V13H4V21H8V13H11L12 9H8V6C8 5.73478 8.10536 5.48043 8.29289 5.29289C8.48043 5.10536 8.73478 5 9 5H12V1Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      link: data?.link?.twitter,
      svg: (
        <svg
          width="18"
          height="16"
          viewBox="0 0 18 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.7577 0H16.4364L10.5842 6.68926L17.4692 15.79H12.0785L7.85678 10.2697L3.02509 15.79H0.345017L6.60482 8.63489L0 0.000727919H5.52755L9.34385 5.04642L13.7577 0ZM12.818 14.1872H14.3022L4.72106 1.51909H3.12845L12.818 14.1872Z"
            fill="black"
          />
        </svg>
      ),
    },
    {
      link: data?.link?.instagram,
      svg: (
        <svg
          width="20"
          height="19"
          viewBox="0 0 20 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.57895 7.26318H1V18H4.57895V7.26318Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.5247 6.36865C14.9485 6.36865 16.3139 6.93425 17.3207 7.94103C18.3275 8.9478 18.8931 10.3133 18.8931 11.7371V18.0002H15.3141V11.7371C15.3141 11.2625 15.1256 10.8073 14.79 10.4717C14.4544 10.1361 13.9993 9.9476 13.5247 9.9476C13.0501 9.9476 12.5949 10.1361 12.2593 10.4717C11.9237 10.8073 11.7352 11.2625 11.7352 11.7371V18.0002H8.15625V11.7371C8.15625 10.3133 8.72185 8.9478 9.72862 7.94103C10.7354 6.93425 12.1009 6.36865 13.5247 6.36865V6.36865Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.78947 4.57895C3.77777 4.57895 4.57895 3.77777 4.57895 2.78947C4.57895 1.80117 3.77777 1 2.78947 1C1.80117 1 1 1.80117 1 2.78947C1 3.77777 1.80117 4.57895 2.78947 4.57895Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      link: data?.link?.linkedIn,
      svg: (
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.75 1H5.25C2.90279 1 1 2.90279 1 5.25V13.75C1 16.0972 2.90279 18 5.25 18H13.75C16.0972 18 18 16.0972 18 13.75V5.25C18 2.90279 16.0972 1 13.75 1Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.9039 8.96451C13.0088 9.67192 12.8879 10.3944 12.5585 11.0292C12.2292 11.664 11.708 12.1787 11.0692 12.5002C10.4304 12.8218 9.70653 12.9337 9.00047 12.8201C8.29441 12.7064 7.64215 12.3731 7.13647 11.8674C6.63078 11.3617 6.29742 10.7095 6.18381 10.0034C6.0702 9.29733 6.18211 8.57342 6.50363 7.93463C6.82515 7.29584 7.33991 6.77469 7.97469 6.44532C8.60947 6.11594 9.33194 5.99511 10.0394 6.10001C10.7609 6.20701 11.429 6.54326 11.9448 7.05907C12.4606 7.57489 12.7969 8.24293 12.9039 8.96451Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.1719 4.82471H14.1819"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      link: data?.link?.tiktok,
      svg: (
        <svg
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.47013 7.78138C4.67888 7.64671 2.7387 8.64188 1.64956 10.7669C0.0158268 13.9543 1.36605 19.17 6.81639 19.17C12.2667 19.17 12.4244 13.9033 12.4244 13.3516C12.4244 12.9837 12.4244 10.9271 12.4244 7.18158C13.5901 7.91998 14.573 8.36445 15.373 8.51499C16.173 8.66558 16.6816 8.73232 16.8988 8.71521V5.64567C16.1588 5.55647 15.5189 5.38644 14.9791 5.1356C14.1693 4.75929 12.5636 3.71502 12.5636 2.18445C12.5647 2.19193 12.5647 1.79712 12.5636 1H9.18961C9.17961 8.49684 9.17961 12.614 9.18961 13.3516C9.20469 14.4579 8.34642 16.0055 6.60626 16.0055C4.86607 16.0055 4.00779 14.4592 4.00779 13.4618C4.00779 12.8511 4.21749 11.9661 5.08449 11.3107C5.59863 10.9221 6.31224 10.7669 7.47013 10.7669C7.47013 10.4087 7.47013 9.41355 7.47013 7.78138Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  const orgCover = organizations.find(
    (org) => org.id === member?.data?.organization?.id
  );
  const isPremium = member?.data?.isPaid;

  const handleConnect = async () => {
    try {
      const finalPayload = { requestTo: member?.data?.id };
      const res = await sendConnectionRequest(finalPayload).unwrap();

      // if (res?.status == 200) {
      //   SuccessAlert("Connection request sent successfully");
      // }
    } catch (error) {
      // ErrorAlert(
      //   error?.data?.issue?.message || "Failed to send connection request"
      // );
    }
  };

  return (
    <div className="block sm:hidden">
      <div className="relative block xs:hidden">
        <Image
          className="max-w-full lg:h-[400px] md:h-[320px] sm:h-[300px] xs:h-[200px] h-[150px]"
          src={
            member?.data?.banner
              ? member?.data?.banner
              : orgCover?.cover || coverPhoto
          }
          height={350}
          width={1500}
          alt="profile cover"
        />
      </div>

      <div className="container">
        <div className="">
          <div>
            <div className="absolute top-[11%] left-6">
              <div className="relative sm:h-[150px] h-[140px]  sm:w-[150px] w-[140px] ">
                <img
                  src={data?.avatar}
                  alt="profile"
                  height={150}
                  width={150}
                  className="sm:h-[150px] h-[140px]  sm:w-[150px] w-[140px]  border-[5px]  rounded-full "
                  style={{ borderColor: `#${data.organization.color}` }}
                />

                <div
                  className="absolute bottom-5 right-0 size-8 flex items-center justify-center rounded-full border-[#15202B] border-[3px] "
                  style={{
                    backgroundColor: data?.isPaid
                      ? `#${data?.organization?.color}`
                      : "#16AD4B",
                    borderColor: `#${data.organization.color}`,
                  }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.48438 10.501L9.49271 12.5177L13.5177 8.48438"
                      stroke="white"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.45937 2.54258C10.0344 2.05091 10.976 2.05091 11.5594 2.54258L12.876 3.67591C13.126 3.89258 13.5927 4.06758 13.926 4.06758H15.3427C16.226 4.06758 16.951 4.79258 16.951 5.67591V7.09258C16.951 7.41758 17.126 7.89258 17.3427 8.14258L18.476 9.45925C18.9677 10.0342 18.9677 10.9759 18.476 11.5592L17.3427 12.8759C17.126 13.1259 16.951 13.5926 16.951 13.9259V15.3426C16.951 16.2259 16.226 16.9509 15.3427 16.9509H13.926C13.601 16.9509 13.126 17.1259 12.876 17.3426L11.5594 18.4759C10.9844 18.9676 10.0427 18.9676 9.45937 18.4759L8.14271 17.3426C7.89271 17.1259 7.42604 16.9509 7.09271 16.9509H5.65104C4.76771 16.9509 4.04271 16.2259 4.04271 15.3426V13.9176C4.04271 13.5926 3.86771 13.1259 3.65937 12.8759L2.53437 11.5509C2.05104 10.9759 2.05104 10.0426 2.53437 9.46758L3.65937 8.14258C3.86771 7.89258 4.04271 7.42591 4.04271 7.10091V5.66758C4.04271 4.78424 4.76771 4.05924 5.65104 4.05924H7.09271C7.41771 4.05924 7.89271 3.88424 8.14271 3.66758L9.45937 2.54258Z"
                      stroke="white"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="mt-4 mb-4 text-right">
              {data?.relationshipStatus && (
                <p className={`text-sm  font-normal text-white font-gothic`}>
                  {data?.relationshipStatus}
                </p>
              )}

              {data?.status && (
                <p
                  className={`font-gothic text-[14px] font-bold leading-5 mb-2 text-white`}
                >
                  {data?.status?.charAt(0).toUpperCase() +
                    data?.status?.slice(1)}{" "}
                  Member
                </p>
              )}

              <p
                className={`font-gothic text-[14px] font-normal leading-5 mb-2 text-white`}
              >
                <span className="mr-1">{data?.connections?.total}</span>
                {data?.connections?.total > 1 ? "Connections" : "Connection"}
              </p>
            </div>

            {/* <div className="block sm:hidden">
            <ViewAllNetworkModal
              orgId={member?.data?.organizationId}
              isPremium={isPremium}
            />
          </div> */}
          </div>
        </div>

        {/* Details */}
        <div className="flex justify-between ">
          <div className="mt-4">
            <div>
              <Image
                className="w-[60px] h-[30px] mt-0 sm:mt-1 mb-1"
                src={data?.organization?.miniLogo}
                alt="chapter"
                width={151}
                height={68}
              />
            </div>
            <h4
              className={`font-gothic text-[22px] font-bold leading-[32px] mb-4 text-white  mt-4`}
            >
              {data?.firstName} <br /> {data?.lastName}
            </h4>

            {data?.state && (
              <div className="flex items-center mt-2 space-x-2 text-sm">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0028 13.4299C13.7259 13.4299 15.1228 12.0331 15.1228 10.3099C15.1228 8.58681 13.7259 7.18994 12.0028 7.18994C10.2797 7.18994 8.88281 8.58681 8.88281 10.3099C8.88281 12.0331 10.2797 13.4299 12.0028 13.4299Z"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M3.61776 8.49C5.58776 -0.169998 18.4178 -0.159997 20.3778 8.5C21.5278 13.58 18.3678 17.88 15.5978 20.54C13.5878 22.48 10.4078 22.48 8.38776 20.54C5.62776 17.88 2.46776 13.57 3.61776 8.49Z"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                </svg>

                <p
                  className={`font-gothic text-base font-bold text-white leading-6 -tracking-[2%]`}
                >
                  {data?.state}
                </p>
              </div>
            )}

            <CardSpicification
              status={data?.organization?.organization}
              status2=""
            />
            <CardSpicification
              status={data?.employment?.status}
              status2={data?.employment?.position}
            />
            {data?.mentorship?.status && (
              <div className="mt-6 space-y-2">
                <p className={`font-gothic text-white text-base font-normal`}>
                  Mentorship Status
                </p>

                <p className={`font-gothic text-white text-base font-normal`}>
                  {data?.mentorship?.status ? data?.mentorship?.status : "N/A"}
                </p>
              </div>
            )}

            {/*  */}
            <div>
              <div
                className={`flex items-center gap-3 px-4 py-3 sm:text-xl xs:text-base text-[14px] text-white font-semibold  rounded-md border  border-white/30 mt-6`}
              >
                <ConnectIcon /> My Network: {member.data?.connections?.total}
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex flex-col items-end space-y-3 text-black">
            <div className="-mt-2">
              <ActionButtonMobile
                memberId={data.id}
                handleConnect={handleConnect}
                connRequestloading={connRequestloading}
                isPremium={isPremium}
              />
            </div>
            {icons
              .filter((icon) => icon.link)
              .map((icon, index) => (
                <Link
                  href={icon.link}
                  target="_blank"
                  key={index}
                  className="grid text-sm bg-white rounded-full cursor-pointer place-content-center size-9"
                >
                  {icon.svg}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
