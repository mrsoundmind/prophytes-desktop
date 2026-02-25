"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedOnboardingRoute({ fields, children }) {
  const router = useRouter();
  const [onboardObject, setOnboardObject] = useState({});

  useEffect(() => {
    const onboardingDatas = JSON.parse(localStorage.getItem("onboading")) || [];

    if (!onboardingDatas.length) {
      router.push("/onboard");
      return;
    }

    const obj = {};
    onboardingDatas.forEach((data) => {
      const key = Object.keys(data)[0];
      obj[key] = Object.values(data)[0];
    });

    setOnboardObject(obj);
  }, [fields]);

  useEffect(() => {
    if (onboardObject && Object.keys(onboardObject).length) {
      fields.forEach((field) => {
        if (field === "initiatedChapter") {
          if (onboardObject[field] || onboardObject?.underGraduateSchool || onboardObject?.isCustomChapter) {
            return;
          } else {
            router.back();
          }
        } else {
          if (!onboardObject[field]) {
            router.back();
          }
        }
      });
    }
  }, [onboardObject]);

  return children;
}
