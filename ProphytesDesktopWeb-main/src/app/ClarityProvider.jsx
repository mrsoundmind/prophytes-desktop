"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export default function ClarityProvider({ baseUrl }) {
  const expectedBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (baseUrl !== expectedBaseUrl) {
    console.warn("Clarity: baseUrl not matched or not provided");
    return null;
  }

  const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  if (!projectId) {
    console.warn("Clarity: Project ID not found");
    return null;
  }

  useEffect(() => {
    Clarity.init(projectId);

  }, []);

  return null;
}
