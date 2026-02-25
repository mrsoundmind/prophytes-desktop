"use client";
import { useStripeUpdateInfoMutation } from "@/src/redux/services/subscriptionApi";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import Link from "next/link";
import { useEffect, useState } from "react";
import Input from "../components/input";
import { SuccessAlert } from "@/src/utils/SuccessAlert";
import { useUserInfoQuery } from "@/src/redux/services/userApi";

export default function UpdateInfo() {
  const { data:userInfo } = useUserInfoQuery();
  const [updateInfo, { data, error, isLoading }] = useStripeUpdateInfoMutation();
  const [formData, setFormData] = useState({
    email: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    shipemail: "",
    shipaddress: "",
    shipaddress2: "",
    shipcity: "",
    shipstate: "",
    shipzip: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zip ||
      !formData.shipemail ||
      !formData.shipaddress ||
      !formData.shipcity ||
      !formData.shipstate ||
      !formData.shipzip
    ) {
      ErrorAlert("Please fill in all required fields.");
      return;
    }
    const billing = {
      line1: formData.address,
      line2: formData.address2,
      city: formData.city,
      state: formData.state,
      postal_code: formData.zip,
    };

    const shipping = {
      email: formData.shipemail,
      name: userInfo?.user?.firstName + " " + userInfo?.user?.lastName,
      address: {
        line1: formData.shipaddress,
        line2: formData.shipaddress2,
        city: formData.shipcity,
        state: formData.shipstate,
        postal_code: formData.shipzip,
      },
    };

    if (billing && shipping) {
      updateInfo({
        customerId: userInfo?.user?.customerId,
        billing,
        shipping,
      });
    }
  };

  useEffect(() => {
    if (data) {
      SuccessAlert("Billing information updated successfully");
    }
    if (error) {
      ErrorAlert(
        error?.data?.message || "Failed to update billing information"
      );
    }
  }, [data, error]);

  return (
    <div className="text-white">
      <h4 className="lg:text-4xl text-xl font-bold text-center py-5">
        Billing Information
      </h4>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10"
        onSubmit={handleSubmit}
      >
        <Input
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <Input
          label="Address 2"
          name="address2"
          value={formData.address2}
          onChange={handleChange}
        />
        <Input
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        <Input
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
        />
        <Input
          label="Zip"
          name="zip"
          value={formData.zip}
          onChange={handleChange}
        />

        <h4 className="lg:text-4xl text-xl font-bold text-center py-5 md:col-span-2">
          Shipping Information
        </h4>
        <Input
          label="Email"
          name="shipemail"
          value={formData.shipemail}
          onChange={handleChange}
        />
        <Input
          label="Address"
          name="shipaddress"
          value={formData.shipaddress}
          onChange={handleChange}
        />
        <Input
          label="Address 2"
          name="shipaddress2"
          value={formData.shipaddress2}
          onChange={handleChange}
        />
        <Input
          label="City"
          name="shipcity"
          value={formData.shipcity}
          onChange={handleChange}
        />
        <Input
          label="State"
          name="shipstate"
          value={formData.shipstate}
          onChange={handleChange}
        />
        <Input
          label="Zip"
          name="shipzip"
          value={formData.shipzip}
          onChange={handleChange}
        />

        {/* Submit Button */}
        <div className="flex flex-col lg:flex-row items-center gap-5  justify-center md:col-span-2 md:text-base">
          <button
            type="submit"
            disabled={isLoading}
            className="min-w-[350px] py-3 bg-white  hover:bg-[#1E1E1E] hover:text-white text-black rounded-lg font-bold"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
          <Link
            href="/subscriptionDetails"
            className="min-w-[350px] py-3 text-center bg-[#1E1E1E] hover:bg-white hover:text-black text-white rounded-lg font-bold"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}
