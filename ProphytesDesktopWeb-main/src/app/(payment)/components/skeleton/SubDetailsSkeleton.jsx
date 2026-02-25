export default function SubDetailsSkeleton() {
  return (
    <div className="text-white animate-pulse">
      <h4 className="mb-4 text-2xl font-bold">Current Plan</h4>
      <div className="flex items-center w-full gap-5 p-4 my-5 bg-white rounded-lg">
        <div className="flex items-center justify-center w-6 h-6 bg-gray-300 border border-black rounded-full">
          <div className="w-4 h-4 rounded-full bg-black/50" />
        </div>
        <div className="space-y-2">
          <div className="w-24 h-4 bg-gray-300 rounded" />
          <div className="w-32 h-3 bg-gray-300 rounded" />
          <div className="w-48 h-3 bg-gray-300 rounded" />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-5 justify-center text-[12px] md:text-base">
        <div className="w-40 px-10 py-3 bg-gray-300 rounded-full" />
        <div className="w-40 px-10 py-3 bg-gray-300 rounded-full" />
      </div>

      <div>
        <h4 className="mt-10 mb-4 text-2xl font-bold font-montserrat">
          Payment method
        </h4>
        <div className="p-4 bg-[#1E1E1E] w-[150px] md:w-[200px] my-5 rounded-lg space-y-2">
          <div className="w-10 h-10 bg-gray-500 rounded" />
          <div className="w-24 h-4 bg-gray-300 rounded" />
        </div>
      </div>

      <div>
        <h4 className="mt-10 mb-4 text-2xl font-bold font-montserrat">
          Billing and shipping information
        </h4>
        <div className="px-10 py-3 mt-5 bg-gray-300 rounded-lg w-60" />
      </div>

      <div>
        <h4 className="mt-10 mb-2 text-2xl font-bold font-montserrat">Invoices</h4>
        <div className="w-64 h-4 my-5 bg-gray-300 rounded" />
        <div className="w-40 px-10 py-3 bg-gray-300 rounded-lg" />
      </div>
    </div>
  );
}
