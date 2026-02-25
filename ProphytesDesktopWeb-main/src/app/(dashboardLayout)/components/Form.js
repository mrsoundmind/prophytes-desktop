"use client";
import ButtonSkeleton from "@/components/skeleton/ButtonSkeleton";
import InputFieldSkeleton from "@/components/skeleton/InputFieldSkeleton";
import { useUserInfoQuery } from "@/src/redux/services/userApi";
import UserInformation from "./UserInformation";

const Form = () => {
  const { data: userInfo, isLoading: user_loading } = useUserInfoQuery();
  const user = userInfo?.user;

  return (
    <div>
      {user_loading ? (
        <>
          <div className="grid lg:grid-cols-2 gap-[30px]">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <InputFieldSkeleton key={i} />
              ))}
          </div>
          <ButtonSkeleton />
        </>
      ) : (
        <>
          <div className="grid lg:grid-cols-2 lg:gap-[30px] p-10 bg-[#141615] border border-[#383838] rounded-[16px] shadow-lg mt-6">
            <div className="">
              <div>
                <UserInformation
                  label="First Name"
                  title={user.firstName}
                  marginBottom="30px"
                  className="capitalize"
                />
                <UserInformation
                  label="Email"
                  title={user.email}
                  marginBottom="30px"
                />
                <UserInformation
                  label="Date Of Birth"
                  title={user.dob}
                  marginBottom="30px"
                />
                <UserInformation
                  label="Country"
                  title={user?.country?.name}
                  marginBottom="30px"
                />
                <UserInformation
                  label="City"
                  title={user.cityName}
                  // marginBottom="30px"
                />
              </div>
            </div>
            <>
              <div>
                <UserInformation
                  label="Last Name"
                  title={user.lastName}
                  marginBottom="30px"
                  className="capitalize"
                />
                <UserInformation
                  label="Phone Number"
                  title={user.phone_number}
                  marginBottom="30px"
                />
                <UserInformation
                  label="Relationship"
                  title={user.relationshipStatus}
                  marginBottom="30px"
                />
                <UserInformation
                  label="State"
                  title={user.state}
                  // marginBottom="30px"
                />
              </div>
            </>
          </div>
        </>
      )}
    </div>
  );
};

export default Form;
