// components/skeleton/ImageSkeleton.jsx
export default function ImageSkeleton({ className }) {
  return (
    <div className={`animate-pulse bg-black p-5 rounded-md ${className}`}>
      {/* Optional: Add a spinner or icon inside */}
      <div className="flex items-center justify-center h-full">
        <span className="text-gray-500">Loading...</span>
      </div>
    </div>
  );
}
