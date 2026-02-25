"use client";
import invoiceIcon from "@/public/img/icon/invoice.png";
import MarkIcon from "@/public/img/icon/Mark";
import { useInvoicesQuery } from "@/src/redux/services/subscriptionApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import downloadPng from "@/public/img/icon/download.png";
import Link from "next/link";

export default function page() {
  const [invoices, setInvoices] = useState([]);
  const { data, loading, error } = useInvoicesQuery();

  useEffect(() => {
    if (data) {
      setInvoices(data?.data?.invoices);
    }
    if (error) {
    }
  }, [data, error]);
  return (
    <div className="container">
      <div className="text-white">
        <h3 className="text-xl font-bold text-center lg:text-3xl">
          Invoices and payment history
        </h3>

        <div className="my-5 lg:my-20">
          <p className="text-lg font-bold text-white lg:text-xl">Invoices</p>
          <p className="mt-3 text-sm text-white">
            View And download your invoices and payment history
          </p>
        </div>

        <div>
          {invoices?.map((invoice) => (
            <div
              key={invoice.id}
              className="my-5 flex flex-col md:flex-row md:justify-between md:items-center py-5 md:px-4 border border-[#E7E7EB] rounded-xl "
            >
              <div className="flex items-center gap-5">
                <div>
                  <Image
                    src={invoiceIcon}
                    alt="invoice"
                    width={50}
                    height={50}
                    className="hidden lg:block"
                  ></Image>
                </div>

                <div className="relative h-20 w-[1px] bg-white hidden lg:block"></div>
                <div>
                  <Link
                    href={invoice?.hostedInvoiceUrl}
                    className="flex gap-1 text-sm font-bold md:text-base md:gap-5 text-wrap "
                  >
                    {invoice.id} <MarkIcon />
                  </Link>
                  <p className="mt-1 text-sm text-white">
                    {invoice.createdAt.split("T")[0]}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between w-full gap-2 px-5 md:gap-5 md:justify-end lg:gap-10 md:w-auto md:px-0 ">
                <p className="mt-3 text-lg font-bold text-white">
                  ${invoice?.amountPaid / 100}
                </p>
                <Link href={invoice?.invoicePdf} className="mt-2">
                  <Image
                    src={downloadPng}
                    alt="download"
                    height={20}
                    width={20}
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
