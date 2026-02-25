import Image from "next/image";

export default function GroupAvatar({ users, isDirect }) {
  const count = users?.length;

  return (
    <div className="relative w-12 h-12 overflow-hidden bg-gray-200 rounded-full ring-2 ring-white">
      {count === 1 && (
        <Image
          src={isDirect ? users[0].avatar : users[0]?.user?.avatar}
          alt={isDirect ? users[0].avatar : users[0]?.user?.fullName}
          fill
          className="object-cover w-full h-full rounded-full"
        />
      )}

      {count === 2 && (
        <>
          <div className="absolute top-0 left-0 w-1/2 h-full ring-1 ring-white">
            <Image
              src={isDirect ? users[0].avatar : users[0]?.user?.avatar}
              alt={isDirect ? users[0].avatar : users[0]?.user?.fullName}
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full ring-1 ring-white">
            <Image
              src={isDirect ? users[1].avatar : users[1]?.user?.avatar}
              alt={isDirect ? users[1].avatar : users[1]?.user?.fullName}
              fill
              className="object-cover"
            />
          </div>
        </>
      )}

      {count === 3 && (
        <>
          {/* Left big image */}
          <div className="absolute top-0 left-0 w-1/2 h-full ring-1 ring-white">
            <Image
              src={isDirect ? users[0].avatar : users[0]?.user?.avatar}
              alt={isDirect ? users[0].avatar : users[0]?.user?.fullName}
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute top-0 right-0 w-1/2 h-1/2 ring-1 ring-white">
            <Image
              src={isDirect ? users[1].avatar : users[1]?.user?.avatar}
              alt={isDirect ? users[1].avatar : users[1]?.user?.fullName}
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 ring-1 ring-white">
            <Image
              src={isDirect ? users[2].avatar : users[2]?.user?.avatar}
              alt={isDirect ? users[2].avatar : users[2]?.user?.fullName}
              fill
              className="object-cover"
            />
          </div>
        </>
      )}

      {count >= 4 && (
        <div className="border border-white">
          {users.slice(0, 4).map((user, idx) => {
            // console.log(user.user.avatar);
            return (
              <div
                key={idx}
                className={`absolute ring-1 ring-white   w-1/2 h-1/2 ${
                  idx === 0
                    ? "top-0 left-0"
                    : idx === 1
                    ? "top-0 right-0"
                    : idx === 2
                    ? "bottom-0 left-0"
                    : "bottom-0 right-0"
                }`}
              >
                <Image
                  src={isDirect ? user?.avatar : user?.user?.avatar}
                  alt={isDirect ? user?.fullName : user?.user?.fullName}
                  fill
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
