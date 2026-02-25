"use client";
import { useUserInfoQuery } from "@/src/redux/services/userApi";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentMiddelware() {
  const pathname = usePathname();
  const { data: userInfo, isLoading } = useUserInfoQuery();
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [isLoadingToken, setIsLoadingToken] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
    setIsLoadingToken(true);
  }, []);

  useEffect(() => {
    if (isLoading || !isLoadingToken) return;

    if (!userInfo && !token && !isLoading) {
      router.push("/");
    } 
    else if(!userInfo?.user?.isVerified){
      router.push("/");
    }
    else {
      const hasSubscription = !!userInfo?.user?.subscriptionId;

      if (hasSubscription && pathname.startsWith("/choose-plan")) {
        router.push("/subscriptionDetails");
      }

      if (!hasSubscription && pathname.startsWith("/subscriptionDetails")) {
        router.push("/choose-plan");
      }
    }
  }, [userInfo, isLoading, pathname, token, router]);

  return null;
}
