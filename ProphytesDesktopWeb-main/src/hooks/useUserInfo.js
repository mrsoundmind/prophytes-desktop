"use client";
import { useEffect, useState, useRef } from "react";
import { API_ROUTES, ROUTES } from "@/src/configs/constants";
import useFetch from "@/src/hooks/useFetch";
import { useRouter, usePathname } from "next/navigation";

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const isMounted = useRef(false);
  const isFetched = useRef(false);
  const {
    data: myInfo,
    loading,
    error,
    fetchData,
    refetch,
  } = useFetch(API_ROUTES.ME, {}, true, ["userInfo"]);

  useEffect(() => {
    if (isMounted.current || isFetched.current) return;
    if (ROUTES.OTP.includes(pathname)) {
      return;
    }
    isMounted.current = true;
    isFetched.current = true;

    fetchData().then((result) => {
      if (result?.user) {
        setUserInfo(result);
        if (ROUTES.RESTRICTED.some((path) => pathname.startsWith(path))) {
          router.push("/profile");
        }
      } else {
        setUserInfo(null);
        if (ROUTES.PROTECTED.some((path) => pathname.startsWith(path))) {
          router.push("/signin");
        }
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, [fetchData, router, pathname]);

  useEffect(() => {
    if (!isMounted.current) return;
    if (ROUTES.OTP.includes(pathname)) {
      return;
    }
    if (myInfo?.user && JSON.stringify(myInfo) !== JSON.stringify(userInfo)) {
      setUserInfo(myInfo);
      if (ROUTES.RESTRICTED.some((path) => pathname.startsWith(path))) {
        router.push("/profile");
      }
    } else if (error && userInfo !== null) {
      setUserInfo(null);
      if (ROUTES.PROTECTED.some((path) => pathname.startsWith(path))) {
        router.push("/signin");
      }
    }
  }, [myInfo, error, router, userInfo, pathname]);

  return { userInfo, setUserInfo, loading, error, refetch };
};

export default useUserInfo;
