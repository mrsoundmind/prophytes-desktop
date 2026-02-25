import { useUserInfoQuery } from "@/src/redux/services/userApi";
import Image from "next/image";

export default function TypingUsers({ typingUsers }) {
  const { data: userInfo } = useUserInfoQuery();
  const lastIndex = typingUsers.length - 1;
  return (
    <div className="flex items-center gap-2 px-1 mt-3 mb-1">
      {typingUsers
        .filter((user) => user.id !== userInfo.user.id)
        .map((user) => (
          <div>
            {" "}
            <div
              key={user.id}
              className="flex items-center justify-center w-8 h-8 overflow-hidden border-2 border-white rounded-full"
            >
              <Image
                src={user.avatar}
                alt={user.fullName}
                width={40}
                height={40}
                className="object-cover w-8 h-8 rounded-full"
              />
            </div>
          </div>
        ))}
      {/* <p className="text-sm text-white">{typingUsers[lastIndex].fullName.split(" ")[0]} is typing...</p> */}
      <p className="text-sm text-white">
        {typingUsers[lastIndex].fullName} is typing...
      </p>
    </div>
  );
}
