"use client";

import { ErrorAlert } from "@/src/utils/ErrorAlert";
import { SuccessAlert } from "@/src/utils/SuccessAlert";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Plan from "./Plan";
import left from "@/public/img/home/bg-left.png";
import right from "@/public/img/home/bg-right.png";
import Image from "next/image";
import PriceSkeleton from "../../(onboardLayout)/components/PriceSkeleton";

const CheckoutPage = () => {
  const [token, setToken] = useState("");
  const [subscriptionId, setSubscriptionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const query = useSearchParams();
  const priceId = query.get("priceId");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token") || "default";
    setToken(token);
  }, []);

  useEffect(() => {
    const fetchSetupIntent = async () => {
      try {
        const response = await fetch("/api/stripe-clientId", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        });
        const data = await response.json();

        if (data?.data?.clientSecret) {
          setClientSecret(data?.data?.clientSecret);
        } else {
          throw new Error("No clientSecret received");
        }
      } catch (error) {
        ErrorAlert("Error fetching setup intent");
        setErrorMessage("Failed to initialize payment form");
      }
    };

    if (priceId && token) {
      fetchSetupIntent();
    }
  }, [token, priceId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (!stripe || !elements) {
      setErrorMessage("Stripe or Elements not loaded");
      setLoading(false);
      return;
    }

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message);
        setLoading(false);
        return;
      }

      const { setupIntent, error: setupError } = await stripe.confirmSetup({
        clientSecret,
        elements,
        redirect: "if_required",
        confirmParams: {
          return_url: window.location.href,
        },
      });

      if (setupError) {
        setErrorMessage(setupError.message);
        setLoading(false);
        return;
      }

      const paymentMethodId = setupIntent.payment_method;
      if (!paymentMethodId) {
        setErrorMessage("No payment method created");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/stripe-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ priceId, paymentMethodId }),
      });

      const subscriptionData = await response.json();
      if (!response.ok) {
        throw new Error(
          subscriptionData.error || "Failed to create subscription"
        );
      }

      setSubscriptionId(subscriptionData?.data?.subscriptionId);

      if (subscriptionData?.data?.clientSecret) {
        const { paymentIntent, error: paymentError } =
          await stripe.confirmCardPayment(
            subscriptionData?.data?.clientSecret,
            {
              payment_method: paymentMethodId,
            }
          );

        if (paymentError) {
          setErrorMessage(paymentError.message);
          setLoading(false);
          return;
        }

        if (paymentIntent.status === "succeeded") {
          SuccessAlert("Payment successful");
          router.push("/choose-plan/checkout");
        }
      } else if (subscriptionData?.data?.status === "active") {
        SuccessAlert("Subscription created successfully");
        router.push("/choose-plan/checkout");
      } else {
        setErrorMessage("Subscription requires payment confirmation");
        setLoading(false);
      }
    } catch (error) {
      ErrorAlert("Failed to process payment");
      setErrorMessage(error.message || "An error occurred");
      setLoading(false);
    }
  };

  if (!clientSecret || !stripe || !elements) {
    return <PriceSkeleton />;
  }

  return (
    <section className=" overflow-hidden bg-[#000000]  ">
      <div className="relative w-full mx-auto overflow-hidden">
        <div className="mx-auto ">
          <div className="absolute z-0 hidden -left-10 -top-40 lg:block">
            <Image
              src={right}
              alt="Left background"
              className=" h-[700px] 2xl:w-[720px] w-auto"
            />
          </div>

          <div className="absolute right-0 z-0 hidden -top-40 lg:block">
            <Image
              src={left}
              alt="Right background"
              className=" 2xl:h-[800px] h-[700px] 2xl:w-[700px] w-auto"
            />
          </div>

          <div className="container ">
            <div className="max-w-[980px] block mx-auto  md:mt-[30px] mt-[30px]">
              <h2 className="xl:text-[52px] sm:text-[44px] text-[23px] xl:leading-[65px] sm:leading-[60px] leading-9 text-white font-montserrat text-center">
                <span className="font-medium text-[#B2B2B2]">
                  Your verification
                </span>
                <br />{" "}
                <span className="text-[#B2B2B2] font-medium">
                  opened the door
                </span>{" "}
                Premium unlocks the full network.
              </h2>
            </div>
            <div className="grid md:grid-cols-2  bg-[#141616] border border-[#262626] mx-auto mt-10 rounded-[20px] overflow-hidden">
              <div className="border-r border-[#262626]  sm:p-6 p-4 ">
                <Plan
                  next="choose-plan"
                  title="Do you want to change your plan?"
                />
              </div>

              <div className="p-4 sm:p-6">
                <div className="bg-[#000000] rounded-[20px] xl:p-10 sm:p-6 p-4  ">
                  <h3 className="sm:text-[36px] xs:text-[22px] text-[18px] text-white font-bold sm:leading-[48px] xs:leading-[35px] leading-[22px] mb-10">
                    Payment Details
                  </h3>

                  <form onSubmit={handleSubmit}>
                    {clientSecret && <PaymentElement />}

                    {errorMessage && (
                      <div className="mt-3 text-red-500">{errorMessage}</div>
                    )}

                    <button
                      disabled={!stripe || loading || subscriptionId}
                      className="w-full py-5 mt-10 text-base font-medium leading-5 bg-white rounded-full"
                    >
                      {loading
                        ? "Processing..."
                        : subscriptionId
                        ? "Subscribed"
                        : "Subscribe Now"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
